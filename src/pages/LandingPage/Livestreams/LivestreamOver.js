import React from "react";
import LivestreamLayout from "./LivestreamLayout";
import { style } from "../../../util/style";

export default ({ livestream, index }) => (
  <LivestreamLayout
    main={
      <div>
        <div style={{ fontWeight: 800 }}>
          Livestream vom {livestream.date.split("-").reverse().join(".")}
        </div>
        <div
          style={{
            paddingTop: 10,
          }}
        >
          <a
            href={livestream.url}
            style={{
              textDecoration: "underline",
              ":hover": { textDecoration: "none" },
              display: "block",
              fontWeight: 400,
              fontSize: 24,
              color: style.dark,
            }}
          >
            {livestream.title}
          </a>
        </div>
      </div>
    }
  />
);
