import React, { useState, useEffect } from "react";
import cockpit from "./cockpit";
import { localStorageGet, localStorageSet } from "./utils";
import { apiUrl } from "./config";
import Box from "./Box";
import Markdown from "./Markdown";
import Radium from "radium";
import { style } from "./style";

const url = `${apiUrl}/corona/v1/`;
const CORONA_LEVEL = "corona_level";
const CORONA_DATA = "corona_data";

export default Radium(() => {
  const [level, setLevel] = useState(localStorageGet(CORONA_LEVEL));
  const [data, setData] = useState(localStorageGet(CORONA_DATA));

  useEffect(() => {
    cockpit.singleton("corona").then((data) => {
      setData(data);
      localStorageSet(CORONA_DATA, data);
    });
    fetch(url)
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        let level = +x[0].Warnstufen.find((entry) => entry.Name === "Wien")
          .Warnstufe;
        setLevel(level);
        localStorageSet(CORONA_LEVEL, level);
      });
  }, []);

  return data && data.enabled ? (
    <Box padded={true} label="Corona Ampel" styled={true}>
      <div
        style={{ display: "flex", [style.mobile]: { flexDirection: "column" } }}
      >
        <div style={{ width: 80, marginBottom: 20 }}>
          <Ampel level={level} />
        </div>
        <div style={{ paddingLeft: 20, [style.mobile]: { paddingLeft: 0 } }}>
          <h3 style={{ marginTop: 0 }}>Aktuelle Maßnahmen</h3>
          <Markdown source={data[level - 1]} />
        </div>
      </div>
    </Box>
  ) : null;
});

const Ampel = ({ level }) => (
  <svg x="0px" y="0px" viewBox="0 0 80.9 250.4" width="60">
    <defs>
      <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" />
      </filter>
      <filter id="f2" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="20" />
      </filter>
    </defs>
    <path d="M72.7,0H8.2C3.6,0,0,3.7,0,8.2v234.1c0,4.5,3.6,8.2,8.2,8.2h64.6c4.5,0,8.2-3.6,8.2-8.2V8.2C80.9,3.7,77.2,0,72.7,0z" />
    {[
      { level: 4, color: "#CB0538", x: 40.5, y: 42.1 },
      { level: 2, color: "#FED500", x: 40.5, y: 152.9 },
      { level: 1, color: "#60B564", x: 40.5, y: 208.3 },
      { level: 3, color: "#F59C00", x: 40.5, y: 97.5 },
    ].map(({ color, x, y, r, level: lvl }) =>
      lvl === level
        ? [
            <circle style={{ fill: color }} cx={x} cy={y} r={20} />,
            <circle
              style={{ fill: color }}
              cx={x}
              cy={y}
              r={20}
              filter="url(#f1)"
            />,
            <circle
              style={{ fill: color }}
              cx={x}
              cy={y}
              r={20}
              filter="url(#f2)"
            />,
          ]
        : [<circle style={{ fill: "#333333" }} cx={x} cy={y} r={20} />]
    )}
  </svg>
);
