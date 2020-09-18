import React from "react";
import Radium from "radium";
import { style } from "./style";

const Box = ({ children, label, styled = true, padded = false }) => {
  return (
    <div>
      {label ? (
        <div
          style={{
            fontWeight: 600,
            marginTop: 40,
            marginBottom: 20,
            fontSize: 30,
            paddingLeft: 20,
          }}
        >
          {label}
        </div>
      ) : null}
      <div
        style={{
          ...(styled ? style.shadowed : {}),
          padding: padded ? style.padding : 0,
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Radium(Box);
