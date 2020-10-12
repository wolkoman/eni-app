import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ExtendedEventDto, Pfarre } from "./eventHandler";

const CONST = {
  START_DATE: "-START-",
  END_DATE: "-END-",
  SUNDAYDATE: "-SUNDAYDATE-",
  NORMALDATE: "-NORMALDATE-",
  TITLE: "-TITLE-",
  DESCRIPTION: "-DESCRIPTION-",
  TIME: "-TIME-",
  CONTENT: "-CONTENT-",
  PFARRE: "-PFARRE-",
  WOCHEN: "-WOCHEN-",
};

const TEMPLATE = (document: string) => ({
  EVENT: (time: string, title: string, description: string) =>
    document
      .match(tableOf(CONST.TITLE))![0]
      .replace(CONST.TIME, time ?? "")
      .replace(CONST.TITLE, title)
      .replace(
        paragraphOf(CONST.DESCRIPTION),
        description
          ? document
              .match(paragraphOf(CONST.DESCRIPTION))![0]
              .replace(CONST.DESCRIPTION, description)
          : ""
      ),
  SUNDAYDATE: (displayDate: string) =>
    document
      .match(paragraphOf(CONST.SUNDAYDATE))![0]
      .replace(CONST.SUNDAYDATE, displayDate),
  NORMALDATE: (displayDate: string) =>
    document
      .match(paragraphOf(CONST.NORMALDATE))![0]
      .replace(CONST.NORMALDATE, displayDate),
});
const paragraphOf = (value: string) =>
  new RegExp(`<w:p((?!</w:p>).)*?${value}.*?</w:p>`, "gms");
const tableOf = (value: string) =>
  new RegExp(`<w:tbl((?!</w:tbl>).)*?${value}.*?</w:tbl>`, "gms");

export default ({
  templateDocumentPath,
  events,
  pfarre,
  wochen,
  start,
  end,
}: {
  templateDocumentPath: string;
  events: Record<string, ExtendedEventDto[]>;
  pfarre: Pfarre;
  wochen: string;
  start: string;
  end: string;
}) =>
  fetch(templateDocumentPath)
    .then((response) =>
      response.status === 200 || response.status === 0
        ? Promise.resolve(response.blob())
        : Promise.reject(new Error(response.statusText))
    )
    .then(JSZip.loadAsync)
    .then(async (zip) => {
      let document = await zip.file("word/document.xml")!.async("string");
      let content = document
        .replace(CONST.START_DATE, start)
        .replace(CONST.END_DATE, end)
        .replace(CONST.PFARRE, pfarre)
        .replace(CONST.WOCHEN, wochen)
        .replace(paragraphOf(CONST.SUNDAYDATE), "")
        .replace(paragraphOf(CONST.NORMALDATE), "")
        .replace(tableOf(CONST.TITLE), "")
        .replace(
          paragraphOf(CONST.CONTENT),
          Object.values(events)
            .map(
              (events) =>
                (events[0].weekday === 0
                  ? TEMPLATE(document).SUNDAYDATE(events[0].displayDate)
                  : TEMPLATE(document).NORMALDATE(events[0].displayDate)) +
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
