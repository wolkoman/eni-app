import Radium from "radium";
import React from "react";
import { style } from "../../util/style";

const Title = Radium(() => {
  return (
    <div
      style={{
        ...style.serif,
        ...style.shadowed,
        position: "relative",
        padding: 80,
        overflow: "hidden",
        textAlign: "center",
        color: style.white,
        background: style.gradient,
        [style.mobile]: { padding: "100px 20px" },
      }}
    >
      <div
        style={{
          color: style.white,
          fontWeight: 800,
          fontSize: 70,
          [style.mobile]: {
            fontSize: 50,
          },
        }}
      >
        Gott liebt dich!
      </div>
      <div
        style={{
          ...style.sans,
          fontWeight: 300,
          fontSize: 18,
        }}
      >
        Bei Ihm findest du Geborgenheit und Zuversicht
      </div>
    </div>
  );
});

export default Title;
