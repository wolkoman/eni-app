import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import cockpit, { host } from "./cockpit";
import { saveAs } from "file-saver";
import { apiUrl } from "./config";

const CONST = {
  START_DATE: "START_DATE",
  END_DATE: "END_DATE",
  EVENTDATE: "EVENTDATE",
  TITLE: "TITLE",
  DESCRIPTION: "DESCRIPTION",
  TIME: "TIME",
  CONTENT: "CONTENT",
};
const TEMPLATE = (document) => ({
  EVENT: (z, t, d) =>
    document
      .match(tableOf(CONST.TITLE))[0]
      .replace(CONST.TIME, z ?? "")
      .replace(CONST.TITLE, t)
      .replace(
        paragraphOf(CONST.DESCRIPTION),
        d
          ? document
              .match(paragraphOf(CONST.DESCRIPTION))[0]
              .replace(CONST.DESCRIPTION, d)
          : ""
      ),
  DATE: (x) =>
    document.match(paragraphOf(CONST.EVENTDATE))[0].replace(CONST.EVENTDATE, x),
});
const paragraphOf = (x) =>
  new RegExp(`<w:p((?!<\\\/w:p>).)*?${x}.*?<\\\/w:p>`, "gms");
const tableOf = (x) =>
  new RegExp(`<w:tbl((?!<\\\/w:tbl>).)*?${x}.*?<\\\/w:tbl>`, "gms");

export default () => {
  useEffect(() => {
    fetch(`${apiUrl}/calendar/v1/`)
      .then((x) => x.json())
      .then((events) => {
        console.log(events);
        cockpit
          .singleton("wochenblatt")
          //.then(({ template }) => fetch(`${host}/${template}`))
          .then(() => fetch("http://lvh.me:3000/wochenblatt.docx"))
          .then((response) =>
            response.status === 200 || response.status === 0
              ? Promise.resolve(response.blob())
              : Promise.reject(new Error(response.statusText))
          )
          .then(JSZip.loadAsync)
          .then(async (zip) => {
            let document = await zip.file("word/document.xml").async("string");
            let content = document
              .replace(CONST.START_DATE, "JÄNNER")
              .replace(CONST.END_DATE, "DEZEMBER")
              .replace(paragraphOf(CONST.EVENTDATE), "")
              .replace(tableOf(CONST.TITLE), "")
              .replace(
                paragraphOf(CONST.CONTENT),
                events.map(
                  (event) =>
                    TEMPLATE(document).DATE(
                      event.start?.dateTime?.substring(0, 10) ??
                        event.start.date
                    ) +
                    TEMPLATE(document).EVENT(
                      event.start?.dateTime?.substring(11, 16),
                      event.title,
                      event.description
                    )
                )
              );
            zip.file("word/document.xml", content);
            zip.generateAsync({ type: "blob" }).then(function (blob) {
              saveAs(blob, "wochenblatt.docx");
            });
          });
      });
  }, []);
  return <div></div>;
};
