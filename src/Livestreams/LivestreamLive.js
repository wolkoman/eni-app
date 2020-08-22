import React from "react";
import LivestreamLayout from "./LivestreamLayout";
import LiveIndicator from "./LiveIndicator";

export default ({ livestream }) => (
  <LivestreamLayout
    main={
      <div>
        <div>JETZT LIVE</div>
        <div style={{ fontWeight: "bold", fontSize: 24 }}>
          <LiveIndicator size={20} />
          <a href={livestream.url}>{livestream.title}</a>
        </div>
      </div>
    }
  />
);
