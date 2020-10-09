import React, { useState, useEffect } from "react";
import Box from "../Box";
import cockpit from "../cockpit";
import { style } from "../style";

interface Liturgy {
  title: string;
  items: { value: { title: string }; field: { name: string } }[];
  _id: string;
}
export default () => {
  const [liturgies, setLitugries] = useState<{ entries: Liturgy[] }>({
    entries: [],
  });
  const exportObs = ({ title, items, _id: id }: Liturgy) => {
    console.log(title, items);
    let sources = items
      .map((item) =>
        [
          ["sing-a-long", "scroll", "info", "credits"].includes(item.field.name)
            ? {
                enabled: true,
                id: "browser_source",
                mixers: 255,
                monitoring_type: 0,
                muted: false,
                name: `${item.value.title} text`,
                myScene: item.value.title,
                myExtraSource: true,
                settings: {
                  restart_when_active: true,
                  shutdown: true,
                  url: `http://api.eni.wien/live-inserts-v1/${id}/${item.value.title.replace(
                    / /g,
                    ""
                  )}`,
                  height: 1080,
                  width: 1920,
                },
              }
            : null,
          ["video", "audio"].includes(item.field.name)
            ? {
                id: "ffmpeg_source",
                name: `${item.value.title} media`,
                monitoring_type: 2,
                myScene: item.value.title,
                myExtraSource: true,
              }
            : null,
          !["video"].includes(item.field.name)
            ? {
                name: "CAMERA",
                myScene: item.value.title,
                myExtraSource: false,
              }
            : null,
          !["video", "audio"].includes(item.field.name)
            ? {
                name: "TON",
                myScene: item.value.title,
                myExtraSource: false,
              }
            : null,
        ].reverse()
      )
      .flat()
      .filter((x) => !!x);
    let json = {
      current_program_scene: items[0].value.title,
      current_scene: items[0].value.title,
      current_transition: "Überblende",
      name: title,
      scene_order: items.map((item) => ({ name: item.value.title })),
      sources: [
        {
          id: "scene",
          name: "CAMERA",
        },
        {
          id: "scene",
          name: "TON",
        },
        ...items.map((item) => ({
          id: "scene",
          name: item.value.title,
          settings: {
            items: sources
              .filter((source) => source && source.myScene === item.value.title)
              .map((source) => ({
                locked: source!.id !== "ffmpeg_source",
                name: source!.name,
                visible: true,
              })),
          },
        })),
        ...sources.filter((source) => source!.myExtraSource),
      ],
    };
    console.log(json);
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(json));
    var dlAnchorElem = document.getElementById("downloadAnchorElem")!;
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `obs-${title.toLowerCase()}.json`);
    dlAnchorElem.click();
  };

  useEffect(() => {
    cockpit.collection("liturgy").then(setLitugries);
  }, []);
  return (
    <Box label="Liturgy Live" padded={true} styled={true}>
      <a
        id="downloadAnchorElem"
        href="http://google.com"
        style={{ display: "none" }}
      >
        anchor
      </a>
      {liturgies.entries.map((liturgy) => (
        <div
          key={liturgy._id}
          style={{
            cursor: "pointer",
            padding: 10,
            borderRadius: style.borderRadius,
            marginBottom: 10,
          }}
          onClick={() => exportObs(liturgy)}
        >
          {liturgy.title}
        </div>
      ))}
    </Box>
  );
};
