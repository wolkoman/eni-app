import React from "react";
import Radium from "radium";
import { style } from "../util/style";

const Box = ({
  children,
  label = "",
  styled = true,
  padded = false,
}: {
  children?: any;
  styled?: boolean;
  padded?: boolean;
  label: string;
}) => {
  return (
    <div>
      {label ? (
        <div
          style={{
            fontWeight: 600,
            marginTop: 40,
            marginBottom: 10,
            paddingLeft: 20,
            textTransform: "uppercase",
            opacity: 0.7,
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
