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
        let level = +x.warnstufen.find((entry) => entry.name === "Wien")
          .warnstufe;
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
  <svg viewBox="0 0 129.76 255.38" width="80">
    <circle
      style={{ fill: level === 4 ? "#cb0538" : "white" }}
      cx="64.88"
      cy="42.14"
      r="20.88"
    />
    <circle
      style={{ fill: level === 2 ? "#fed500" : "white" }}
      cx="64.88"
      cy="157.83"
      r="20.88"
    />
    <circle
      style={{ fill: level === 1 ? "#60b564" : "white" }}
      cx="64.88"
      cy="218.1"
      r="20.88"
    />
    <circle
      style={{ fill: level === 3 ? "#f59c00" : "white" }}
      cx="64.88"
      cy="99.4"
      r="20.88"
    />
    <path
      d="M65.48,65.13A21.88,21.88,0,1,1,87.36,43.25,21.9,21.9,0,0,1,65.48,65.13Zm0-41.76A19.88,19.88,0,1,0,85.36,43.25,19.9,19.9,0,0,0,65.48,23.37Z"
      transform="translate(-0.6 -1.11)"
    />
    <path class="cls-5" d="M94.39,38.34" transform="translate(-0.6 -1.11)" />
    <path class="cls-5" d="M36.57,38.34" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,38.51a28.32,28.32,0,0,0-55.85,0l-2-.33a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M65.48,180.81a21.88,21.88,0,1,1,21.88-21.88A21.9,21.9,0,0,1,65.48,180.81Zm0-41.76a19.88,19.88,0,1,0,19.88,19.88A19.9,19.9,0,0,0,65.48,139.05Z"
      transform="translate(-0.6 -1.11)"
    />
    <path class="cls-5" d="M94.39,154" transform="translate(-0.6 -1.11)" />
    <path class="cls-5" d="M36.57,154" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,154.2a28.32,28.32,0,0,0-55.85,0l-2-.34a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M65.48,241.08A21.88,21.88,0,1,1,87.36,219.2,21.9,21.9,0,0,1,65.48,241.08Zm0-41.76A19.88,19.88,0,1,0,85.36,219.2,19.9,19.9,0,0,0,65.48,199.32Z"
      transform="translate(-0.6 -1.11)"
    />
    <path class="cls-5" d="M94.39,214.3" transform="translate(-0.6 -1.11)" />
    <path class="cls-5" d="M36.57,214.3" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,214.47a28.32,28.32,0,0,0-55.85,0l-2-.34a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M130.35,16.42v-2.5H108.43V11.76A10.67,10.67,0,0,0,97.77,1.11H33.18A10.67,10.67,0,0,0,22.53,11.76v2.16H.6v2.5a24.47,24.47,0,0,0,21.93,24.3V71.18H.6v2.5A24.47,24.47,0,0,0,22.53,98V129.6H.6v2.5a24.46,24.46,0,0,0,21.93,24.3v33.47H.6v2.5a24.46,24.46,0,0,0,21.93,24.3v29.16a10.67,10.67,0,0,0,10.65,10.66H97.77a10.68,10.68,0,0,0,10.66-10.66V216.67a24.45,24.45,0,0,0,21.92-24.3v-2.5H108.43V156.4a24.45,24.45,0,0,0,21.92-24.3v-2.5H108.43V98a24.46,24.46,0,0,0,21.92-24.3v-2.5H108.43V40.72A24.46,24.46,0,0,0,130.35,16.42Zm-5.16,2.5a19.46,19.46,0,0,1-16.76,16.76V18.92Zm-119.43,0H22.53V35.68A19.46,19.46,0,0,1,5.76,18.92Zm0,57.26H22.53V93A19.47,19.47,0,0,1,5.76,76.18Zm0,58.42H22.53v16.77A19.47,19.47,0,0,1,5.76,134.6Zm0,60.27H22.53v16.77A19.47,19.47,0,0,1,5.76,194.87Zm119.43,0a19.47,19.47,0,0,1-16.76,16.77V194.87Zm0-60.27a19.47,19.47,0,0,1-16.76,16.77V134.6Zm0-58.42A19.47,19.47,0,0,1,108.43,93V76.18ZM103.43,98.11V245.83a5.67,5.67,0,0,1-5.66,5.66H33.18a5.66,5.66,0,0,1-5.65-5.66V11.76a5.65,5.65,0,0,1,5.65-5.65H97.77a5.66,5.66,0,0,1,5.66,5.65V98.11Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M65.48,122.39a21.88,21.88,0,1,1,21.88-21.88A21.9,21.9,0,0,1,65.48,122.39Zm0-41.76a19.88,19.88,0,1,0,19.88,19.88A19.9,19.9,0,0,0,65.48,80.63Z"
      transform="translate(-0.6 -1.11)"
    />
    <path class="cls-5" d="M94.39,95.61" transform="translate(-0.6 -1.11)" />
    <path class="cls-5" d="M36.57,95.61" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,95.77a28.32,28.32,0,0,0-55.85,0l-2-.33a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      style={{ fill: "white" }}
      d="M52.75,43.53l-2-.33A17.1,17.1,0,0,1,67.65,28.8v2A15.1,15.1,0,0,0,52.75,43.53Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      style={{ fill: "white" }}
      d="M52.75,159.21l-2-.33a17.09,17.09,0,0,1,16.87-14.39v2A15.11,15.11,0,0,0,52.75,159.21Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      style={{ fill: "white" }}
      d="M52.75,219.48l-2-.33a17.09,17.09,0,0,1,16.87-14.39v2A15.11,15.11,0,0,0,52.75,219.48Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      style={{ fill: "white" }}
      d="M52.75,100.79l-2-.33a17.1,17.1,0,0,1,16.87-14.4v2A15.11,15.11,0,0,0,52.75,100.79Z"
      transform="translate(-0.6 -1.11)"
    />
  </svg>
);
