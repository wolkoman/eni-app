import Radium from "radium";
import React from "react";
import { style } from "../../../style";

export default Radium(({ main, info }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      [style.mobile]: { flexDirection: "column" },
      padding: "20px 0",
    }}
  >
    <div children={main} />
    {info ? <div children={info} /> : null}
  </div>
));
