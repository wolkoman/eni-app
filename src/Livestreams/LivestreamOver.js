import React from "react";
import LivestreamLayout from "./LivestreamLayout";

export default ({ livestream, index }) => (
    <LivestreamLayout
    index={index}
    main={
      <div>
        <div>LIVESTREAM VOM {livestream.date.split('-').reverse().join('.')}</div>
        <div style={{ fontWeight: "bold", fontSize: 24 }}>
          <a href={livestream.url}>{livestream.title}</a>
        </div>
      </div>
    }
  />
);