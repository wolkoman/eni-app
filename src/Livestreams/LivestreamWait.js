import React from "react";
import LivestreamLayout from "./LivestreamLayout";
import { humanDateFormat } from "../utils";

export default ({ livestream }) => (
    <LivestreamLayout
      main={
        <div>
          Der Livestream <b>{livestream.title}</b> beginnt am{" "}
          {humanDateFormat(livestream.date)} um {livestream.time} Uhr.
          <br />
          Zu Beginn werden Sie automatisch weitergeleitet.
        </div>
      }
      info={
        <div
          style={{
            fontSize: 30,
            fontWeight: "bold",
            display: livestream.countdown > 12 * 60 * 60 ? "none" : "block",
          }}
        >
          {livestream.countdownString}
        </div>
      }
    />
  );