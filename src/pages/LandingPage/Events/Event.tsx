import React from "react";
import { FaQuestion, FaTimes } from "react-icons/fa";
import { JSONLD, Generic } from "react-structured-data";
import { ExtendedEventDto, Pfarre } from "../../../util/eventHandler";
import { style } from "../../../util/style";
var sanitize = require("sanitize-html");

export default ({
  event,
  showPfarre,
}: {
  event: ExtendedEventDto;
  showPfarre: boolean;
}) => {
  const descriptionStyle = { fontSize: 14, fontWeight: "normal" };
  const canceled = event.title.match("ENTFÄLLT");
  const interim = event.title.match("VORLÄUFIG");
  let title = event.title;
  const color = (pfarre: Pfarre) =>
    ({
      all: style.light,
      emmaus: style.accent1,
      neustift: style.accent2,
      inzersdorf: style.accent3,
    }[pfarre]);
  return (
    <div
      key={event.id}
      style={{
        display: "flex",
        ...style.serif,
        fontWeight: 600,
        fontSize: 18,
        marginTop: 5,
      }}
    >
      <div
        style={{
          opacity: event.wholeday ? 0 : 1,
          paddingRight: 20,
        }}
      >
        {event.time}
      </div>
      <div
        style={{
          width: 20,
          flexGrow: 0,
          flexShrink: 0,
          display: "flex",
          position: "relative",
        }}
      >
        {canceled ? (
          <div style={{ position: "absolute", top: 4, left: -4 }}>
            <FaTimes></FaTimes>
          </div>
        ) : interim ? (
          <div style={{ position: "absolute", top: 4, left: -4 }}>
            <FaQuestion></FaQuestion>
          </div>
        ) : null}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color(event.pfarre),
            marginTop: 10,
          }}
        ></div>
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: canceled
              ? `<s>${title.split("ENTFÄLLT")[0]}</s> ENTFÄLLT`
              : interim
              ? `<span style="opacity: 0.5">${title}</span>`
              : event.title,
          }}
        ></div>
        {showPfarre && event.pfarre !== "all" ? (
          <div style={descriptionStyle as any}>
            <i>
              in{" "}
              {{
                emmaus: "Emmaus",
                inzersdorf: "St. Nikolaus",
                neustift: "Neustift",
              }[event.pfarre] ?? "unbekannt"}
            </i>
          </div>
        ) : null}
        {event.place ? (
          <div style={descriptionStyle as any}>
            <i style={{ textTransform: "capitalize" }}>in {event.place}</i>
          </div>
        ) : null}
        {event.attachments?.map(attachment => (
          <div style={descriptionStyle as any}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={attachment.fileUrl}
              key={attachment.fileId}
            >
              <img src={attachment.iconLink} alt="file type" />
              {attachment.title}
            </a>
          </div>
        ))}
        {event.description && !canceled ? (
          <div
            style={descriptionStyle as any}
            dangerouslySetInnerHTML={{
              __html: sanitize(event.description, {
                allowedTags: ["b", "i", "em", "strong", "a", "ul", "ol", "li"],
                allowedAttributes: {
                  a: ["href"],
                },
                allowedIframeHostnames: ["www.youtube.com"],
              }),
            }}
          />
        ) : null}
      </div>
      {event.pfarre !== "all" && event.wholeday === false ? (
        <EventSchema event={event}></EventSchema>
      ) : null}
    </div>
  );
};

const EventSchema = ({ event }: { event: ExtendedEventDto }) => (
  <JSONLD>
    <Generic
      type="event"
      jsonldtype="Event"
      schema={{ name: event.title, startDate: event.start, endDate: event.end }}
    >
      <Generic
        type="location"
        jsonldtype="Place"
        schema={{ name: event.location.name }}
      >
        <Generic
          type="address"
          jsonldtype="PostalAddress"
          schema={{
            addressLocality: "Vienna",
            addressRegion: "VIE",
            postalCode: event.location.postalCode,
            streetAdress: event.location.address,
          }}
        />
      </Generic>
    </Generic>
  </JSONLD>
);
