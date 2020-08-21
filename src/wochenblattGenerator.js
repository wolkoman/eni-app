import JSZip from "jszip";
import { saveAs } from "file-saver";

const CONST = {
  START_DATE: "-START-",
  END_DATE: "-END-",
  DATE: "-DATE-",
  TITLE: "-TITLE-",
  DESCRIPTION: "-DESCRIPTION-",
  TIME: "-TIME-",
  CONTENT: "-CONTENT-",
  PFARRE: "-PFARRE-",
  WOCHEN: "-WOCHEN-",
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
    document.match(paragraphOf(CONST.DATE))[0].replace(CONST.DATE, x),
});
const paragraphOf = (x) =>
  new RegExp(`<w:p((?!</w:p>).)*?${x}.*?</w:p>`, "gms");
const tableOf = (x) =>
  new RegExp(`<w:tbl((?!</w:tbl>).)*?${x}.*?</w:tbl>`, "gms");

export default ({ templateDocumentPath, events, pfarre, wochen, start, end }) =>
  fetch(templateDocumentPath)
    .then((response) =>
      response.status === 200 || response.status === 0
        ? Promise.resolve(response.blob())
        : Promise.reject(new Error(response.statusText))
    )
    .then(JSZip.loadAsync)
    .then(async (zip) => {
      let document = await zip.file("word/document.xml").async("string");
      let content = document
        .replace(CONST.START_DATE, start)
        .replace(CONST.END_DATE, end)
        .replace(CONST.PFARRE, pfarre)
        .replace(CONST.WOCHEN, wochen)
        .replace(paragraphOf(CONST.DATE), "")
        .replace(tableOf(CONST.TITLE), "")
        .replace(
          paragraphOf(CONST.CONTENT),
          Object.values(events)
            .map(
              (events) =>
                TEMPLATE(document).DATE(events[0].displayDate) +
                events
                  .map((event) =>
                    TEMPLATE(document).EVENT(
                      event.wholeday ? "" : event.time,
                      event.title,
                      event.description
                    )
                  )
                  .join("")
            )
            .join("")
        );
      zip.file("word/document.xml", content);
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        saveAs(blob, "wochenblatt.docx");
      });
    });
