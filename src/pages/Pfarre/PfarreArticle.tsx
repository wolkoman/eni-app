import React, { useEffect, useState } from "react";
import Radium from "radium";
import { style } from "../../style";
import Loader from "../../Graphic/Loader";
import Markdown from "../../Markdown";
import Box from "../../Box";
import { host } from "../../cockpit";

interface ChurchEntry {
  name: string;
  info: string;
  image: { path: string };
  team: string;
  team2: string;
  extended: boolean;
  map: string;
  contact: string;
}
const ChurchArticle = Radium(
  ({ entry }: { entry: () => Promise<ChurchEntry> }) => {
    const teamRenderer = {
      image: (options: { alt: string; src: string }) => (
        <Person
          name={options.alt?.split("|")?.[0]}
          descriptions={options.alt?.split("|")?.[1]?.split("-")}
          imageSource={options.src}
        />
      ),
      paragraph: (options: { children: string }) => (
        <div>{options.children}</div>
      ),
    };
    const [object, setObject] = useState<ChurchEntry>();
    useEffect(() => {
      entry().then((x) => setObject(x));
    }, [entry]);

    return (
      <div
        style={{
          [style.mobile]: { padding: 20 },
        }}
      >
        {object ? (
          <div>
            <h1 style={{ ...style.serif, padding: "0 20px", fontSize: 40 }}>
              {object.name}
            </h1>
            <Box label="Allgemein">
              <div
                style={{
                  display: "flex",
                  [style.mobile]: { flexDirection: "column" },
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      object.image.path?.[0] === "/" ? host : ""
                    }${object.image.path})`,
                    backgroundSize: "cover",
                    width: "100%",
                    backgroundPosition: "center",
                    [style.mobile]: { height: 300 },
                  }}
                ></div>
                <div style={{ padding: style.padding }}>
                  <Markdown source={object.info} headingOffset={2} />
                </div>
              </div>
            </Box>
            {object.extended ? (
              <div>
                <Box label="Team">
                  <div
                    style={{
                      height: 400,
                      overflow: "auto",
                      padding: style.padding,
                      display: "flex",
                      justifyContent: "stretch",
                      [style.maxmedia(800)]: { flexDirection: "column" },
                    }}
                  >
                    <div style={{ flexGrow: 1 }}>
                      <Markdown
                        source={object.team}
                        headingOffset={2}
                        renderers={teamRenderer}
                      />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <Markdown
                        source={object.team2}
                        headingOffset={2}
                        renderers={teamRenderer}
                      />
                    </div>
                  </div>
                </Box>

                <Box label="Kontakt" padded={false}>
                  <div style={{ padding: style.padding }}>
                    <Markdown source={object.contact} headingOffset={2} />
                  </div>
                  <iframe
                    title="Karte"
                    style={{
                      width: "100%",
                      height: 600,
                    }}
                    width="100%"
                    src={object.map}
                  ></iframe>
                </Box>
              </div>
            ) : null}
          </div>
        ) : (
          <Loader></Loader>
        )}
      </div>
    );
  }
);

const Person = Radium(
  ({
    name,
    descriptions,
    imageSource,
  }: {
    name: string;
    descriptions: string[];
    imageSource: string;
  }) => {
    const size = 50;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${imageSource.replace("http", "https")})`,
            backgroundColor: "#ccc",
            backgroundSize: "cover",
            width: size,
            height: size,
            borderRadius: size,
            marginRight: 10,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 18 }}>{name}</div>
          {descriptions?.map((text, i) => (
            <div
              key={i}
              style={{ opacity: 0.8, marginBottom: 2, fontSize: 14 }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default ChurchArticle;
