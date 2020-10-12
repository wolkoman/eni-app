import React from "react";
import LivestreamLayout from "./LivestreamLayout";
import LiveIndicator from "./LiveIndicator";
import { style } from "../../../util/style";

export default ({ livestream }) => (
  <LivestreamLayout
    main={
      <div>
        <div style={{ fontWeight: 800 }}>JETZT LIVE</div>
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            paddingTop: 10,
          }}
        >
          <LiveIndicator size={20} />
          <a
            href={livestream.url}
            style={{
              textDecoration: "underline",
              ":hover": { textDecoration: "none" },
              display: "block",
              paddingLeft: 10,
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
