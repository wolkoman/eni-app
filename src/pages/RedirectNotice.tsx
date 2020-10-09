import React, { useEffect } from "react";
import Radium from "radium";
import { style } from "../style";
import { useHistory } from "react-router-dom";
import { localStorageGet, localStorageSet } from "../utils";

const RedirectNotice = Radium(() => {
  const timeout = localStorageGet("redirect-notice") ? 0 : 10;
  const history = useHistory();
  const spinnerKeyframes = Radium.keyframes({
    "0%": { width: "0%" },
    "100%": { width: "100%" },
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorageSet("redirect-notice", true);
      history.push("/");
    }, timeout * 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div style={{ padding: 50, fontSize: 30 }}>
      <p style={{ fontWeight: "bold", fontSize: 25 }}>
        Willkommen auf der Seite der<br></br>
        Pfarren Emmaus am Wienerberg,<br></br>
        Inzersdorf-Neustift und Inzersdorf.
      </p>
      <p>
        Hier finden Sie alle Termine und<br></br>
        wichtigen Informationen.
      </p>
      <div
        style={
          {
            background: style.dark,
            animation: `q ${timeout}s linear infinite`,
            animationName: spinnerKeyframes,
            height: 5,
          } as any
        }
      ></div>
    </div>
  );
});

export default RedirectNotice;
