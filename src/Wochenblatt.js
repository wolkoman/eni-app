import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import cockpit, { host } from "./cockpit";
import { saveAs } from "file-saver";
import { apiUrl } from "./config";

const startDateMatch = /START_DATE/gms;
const endDateMatch = /END_DATE/gms;
const dateParagraphMatch = /<w:p ((?!<\/w:p>).)*?EVENTDATE.*?<\/w:p>/gms;
const eventParagraphMatch = /<w:tbl>((?!<\/w:tbl>).)*?TITLE.*?<\/w:tbl>/gms;
const descriptionParagraphMatch = /<w:p((?!<\/w:p>).)*?DESCRIPTION.*?<\/w:p>/;
const timeMatch = /TIME/;
const titleMatch = /TITLE/;
const descriptionMatch = /DESCRIPTION/;
const contentMatch = /<w:p((?!<\/w:p>).)*?CONTENT.*?<\/w:p>/;
const dateMatch = /EVENTDATE/;

export default () => {
  const [logging, setLog] = useState('');
  const log = x => setLog(`${logging}\n${x}`);
  useEffect(() => {
    fetch(`${apiUrl}/calendar/v1/`)
      .then((x) => x.json())
      .then((events) => {
        console.log(events);
        cockpit
          .singleton("wochenblatt")
          //.then(({ template }) => fetch(`${host}/${template}`))
          .then(() => fetch('http://lvh.me:3000/wochenblatt.docx'))
          .then(function (response) {
            if (response.status === 200 || response.status === 0) {
              return Promise.resolve(response.blob());
            } else {
              return Promise.reject(new Error(response.statusText));
            }
          })
          .then(JSZip.loadAsync)
          .then(async (zip) => { 
            let document = await zip
              .file("word/document.xml")
              .async("string");
            const dateContent = document.match(dateParagraphMatch)[0];
            const eventContent = document.match(eventParagraphMatch)[0];
            const descriptionParagraphContent = document.match(descriptionParagraphMatch)[0];
            const date = (x) => dateContent.replace(dateMatch, x);
            const event = (z, t, d) =>
              eventContent
                .replace(timeMatch, z ?? '')
                .replace(titleMatch, t)
                .replace(descriptionParagraphMatch, d ? descriptionParagraphContent.replace(descriptionMatch, d): '');
            log(eventContent);
            document = document.replace(startDateMatch, "JÄNNER");
            document = document.replace(endDateMatch, "DEZEMBER");
            let content =
              document.replace(dateParagraphMatch, '').replace(eventParagraphMatch, '').replace(contentMatch, date("TESTS") + event('10:00','Messe','in der Kirche') + event('10:00','Messe'))
              ;
            zip.file("word/document.xml", content);
            zip.generateAsync({ type: "blob" }).then(function (blob) {
              saveAs(blob, "hello.docx");
            });
          })
      });
  }, []);
  return <div>{logging}</div>;
};
