import React, { useState, useEffect } from "react";
import Box from "./Box";
import cockpit from "../util/cockpit";
import { style } from "../util/style";

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
    let intro = [
      {
        id: "scene",
        name: "Intro",
        settings: {
          items: [
            {
              locked: true,
              name: "intro media",
              visible: true,
            },
          ],
        },
      },
      {
        id: "ffmpeg_source",
        name: `intro media`,
        locked: true,
        monitoring_type: 2,
        volume: 0.30305752158164978,
        settings: {
          input:
            "https://cockpit.eni.wien/storage/uploads/2020/09/23/5f6b137b14a94ENI-Intro.mp4",
          is_local_file: false,
        },
      },
      {
        id: "scene",
        name: "Idle",
        settings: {
          items: [
            {
              locked: true,
              name: "idle text1",
              visible: true,
              pos: {
                x: 214.0,
                y: 615.0,
              },
              rot: 0.0,
              scale: {
                x: 0.50647246837615967,
                y: 0.5078125,
              },
            },
            {
              locked: true,
              name: "idle text2",
              visible: true,
              pos: {
                x: 214.0,
                y: 745.0,
              },
              rot: 0.0,
              scale: {
                x: 0.24618902802467346,
                y: 0.24609375,
              },
            },
          ],
        },
      },
      {
        id: "text_gdiplus",
        name: `idle text1`,
        locked: true,
        settings: {
          bk_color: 4281545523,
          color: 4281545523,
          font: {
            face: "Source Sans Pro Black",
            flags: 1,
            size: 256,
            style: "Black",
          },
          text: "Hl. Messe",
        },
      },
      {
        id: "text_gdiplus",
        name: `idle text2`,
        locked: true,
        settings: {
          bk_color: 4281545523,
          color: 4281545523,
          font: {
            face: "Source Sans Pro",
            flags: 0,
            size: 256,
            style: "Regular",
          },
          text: "Der Livestream beginnt in Kürze",
        },
      },
    ];
    let sources = items
      .map(item =>
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
          ["video", "audio", "sing-a-long", "scroll"].includes(item.field.name)
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
                name: "KAMERA",
                myScene: item.value.title,
                myExtraSource: false,
              }
            : null,
          !["video", "audio", "sing-a-long"].includes(item.field.name)
            ? {
                name: "TON",
                myScene: item.value.title,
                myExtraSource: false,
              }
            : null,
        ].reverse()
      )
      .flat()
      .filter(x => !!x);
    let json = {
      current_program_scene: items[0].value.title,
      current_scene: items[0].value.title,
      current_transition: "Überblende",
      name: title,
      scene_order: [
        "Idle",
        "Intro",
        ...items.map(item => ({ name: item.value.title })),
      ],
      sources: [
        {
          id: "scene",
          name: "KAMERA",
        },
        {
          id: "scene",
          name: "TON",
        },
        ...items.map(item => ({
          id: "scene",
          name: item.value.title,
          settings: {
            items: sources
              .filter(source => source && source.myScene === item.value.title)
              .map(source => ({
                locked: source!.id !== "ffmpeg_source",
                name: source!.name,
                visible: true,
              })),
          },
        })),
        ...sources.filter(source => source!.myExtraSource),
        ...intro,
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
    <Box label="OBS Export" padded={true} styled={true}>
      <a
        id="downloadAnchorElem"
        href="http://google.com"
        style={{ display: "none" }}
      >
        anchor
      </a>
      {liturgies.entries.map(liturgy => (
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
