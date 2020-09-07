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
    <path d="M94.39,38.34" transform="translate(-0.6 -1.11)" />
    <path d="M36.57,38.34" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,38.51a28.32,28.32,0,0,0-55.85,0l-2-.33a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M65.48,180.81a21.88,21.88,0,1,1,21.88-21.88A21.9,21.9,0,0,1,65.48,180.81Zm0-41.76a19.88,19.88,0,1,0,19.88,19.88A19.9,19.9,0,0,0,65.48,139.05Z"
      transform="translate(-0.6 -1.11)"
    />
    <path d="M94.39,154" transform="translate(-0.6 -1.11)" />
    <path d="M36.57,154" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,154.2a28.32,28.32,0,0,0-55.85,0l-2-.34a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M65.48,241.08A21.88,21.88,0,1,1,87.36,219.2,21.9,21.9,0,0,1,65.48,241.08Zm0-41.76A19.88,19.88,0,1,0,85.36,219.2,19.9,19.9,0,0,0,65.48,199.32Z"
      transform="translate(-0.6 -1.11)"
    />
    <path d="M94.39,214.3" transform="translate(-0.6 -1.11)" />
    <path d="M36.57,214.3" transform="translate(-0.6 -1.11)" />
    <path
      d="M93.4,214.47a28.32,28.32,0,0,0-55.85,0l-2-.34a30.32,30.32,0,0,1,59.79,0Z"
      transform="translate(-0.6 -1.11)"
    />
    <path
      d="M33.18,255.49c-5.33,0-9.66-4.33-9.66-9.66v-30.06l-0.9-0.09C10.64,214.45,1.6,204.43,1.6,192.37v-1.5h21.93V155.5
      l-0.9-0.09C10.64,154.18,1.6,144.16,1.6,132.1v-1.5h21.93V97.08l-0.9-0.09C10.64,95.76,1.6,85.74,1.6,73.68v-1.5h21.93V39.81
      l-0.9-0.09C10.64,38.5,1.6,28.48,1.6,16.42v-1.5h21.93v-3.15c0-5.33,4.33-9.66,9.66-9.66h64.58c5.33,0,9.66,4.33,9.66,9.66v3.15
      h21.93v1.5c0,12.06-9.04,22.08-21.03,23.31l-0.9,0.09v32.36h21.93v1.5c0,12.06-9.04,22.08-21.03,23.31l-0.9,0.09v33.53h21.93v1.5
      c0,12.06-9.04,22.08-21.03,23.31l-0.9,0.09v35.37h21.93v1.5c0,12.06-9.04,22.08-21.03,23.31l-0.9,0.09v30.06
      c0,5.33-4.33,9.66-9.66,9.66H33.18z M33.18,5.11c-3.67,0-6.66,2.99-6.66,6.66v234.07c0,3.67,2.99,6.66,6.66,6.66h64.58
      c3.67,0,6.66-2.99,6.66-6.66V11.76c0-3.67-2.99-6.66-6.66-6.66H33.18z M107.43,212.78l1.13-0.15c9.2-1.19,16.45-8.44,17.63-17.63
      l0.15-1.13h-18.91V212.78z M4.77,195c1.19,9.2,8.44,16.45,17.63,17.63l1.13,0.15v-18.91H4.62L4.77,195z M107.43,152.51l1.13-0.15
      c9.2-1.19,16.45-8.44,17.63-17.63l0.15-1.13h-18.91V152.51z M4.77,134.73c1.19,9.2,8.44,16.45,17.63,17.63l1.13,0.15V133.6H4.62
      L4.77,134.73z M107.43,94.08l1.13-0.15c9.2-1.19,16.45-8.44,17.63-17.63l0.15-1.13h-18.91V94.08z M4.77,76.3
      c1.19,9.2,8.44,16.45,17.63,17.63l1.13,0.15V75.18H4.62L4.77,76.3z M107.43,36.82l1.13-0.15c9.2-1.19,16.45-8.44,17.63-17.63
      l0.15-1.13h-18.91V36.82z M4.77,19.04c1.19,9.2,8.44,16.45,17.63,17.63l1.13,0.15V17.92H4.62L4.77,19.04z"
    />
    <path
      d="M65.48,122.39a21.88,21.88,0,1,1,21.88-21.88A21.9,21.9,0,0,1,65.48,122.39Zm0-41.76a19.88,19.88,0,1,0,19.88,19.88A19.9,19.9,0,0,0,65.48,80.63Z"
      transform="translate(-0.6 -1.11)"
    />
    <path d="M94.39,95.61" transform="translate(-0.6 -1.11)" />
    <path d="M36.57,95.61" transform="translate(-0.6 -1.11)" />
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
