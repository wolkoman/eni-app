import Radium from "radium";
import React from "react";
import { style } from "../util/style";

export default Radium(({ children }: { children: any }) => (
  <div
    style={{
      display: "grid",
      gridTemplate: '"a a b" 200px "a a c" 200px',
      [style.mobile]: {
        gridTemplate: '"a" 300px "b" 200px "c" 200px',
        margin: "0 20px",
      },
      gridGap: 20,
    }}
  >
    {children}
  </div>
));
