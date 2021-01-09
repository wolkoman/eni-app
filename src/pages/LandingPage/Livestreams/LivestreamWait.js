import React from "react";
import LivestreamLayout from "./LivestreamLayout";

export default ({ livestream }) => (
  <LivestreamLayout
    main={
      <div>
        <div style={{ fontWeight: 800, color: "#777" }}>
          Livestream am {livestream.date.split("-").reverse().join(".")} um{" "}
          {livestream.time} Uhr
          <div
            style={{
              display: livestream.countdown > 24 * 60 * 60 ? "none" : "inline",
            }}
          >
            {" "}
            in {livestream.countdownString}
          </div>
        </div>
        <div
          style={{
            paddingTop: 10,
          }}
        >
          <div
            style={{
              display: "block",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: 24,
              color: "#777",
            }}
          >
            {livestream.title}
          </div>
          <div style={{ fontSize: 12, paddingTop: 8, color: "#777" }}>
            Dieser Livestream ist in der Zukunft. Sie werden zu Beginn
            automatisch weitergeleitet.
          </div>
        </div>
      </div>
    }
  />
);
