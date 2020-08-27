import React from "react";
import LivestreamLayout from "./LivestreamLayout";
import { humanDateFormat } from "../utils";
import { FaVideo } from "react-icons/fa";

export default ({ livestream }) => (
  <LivestreamLayout
    main={
      <div>
        Der Livestream <b>{livestream.title}</b> beginnt am{" "}
        {humanDateFormat(livestream.date)} um {livestream.time} Uhr.
        <br />
        Bleiben Sie auf dieser Seite, Sie werden zu Beginn automatisch
        weitergeleitet.
      </div>
    }
    info={
      <div
        style={{
          fontSize: 30,
          fontWeight: "bold",
          paddingLeft: 10,
          paddingTop: 10,
          display: livestream.countdown > 24 * 60 * 60 ? "none" : "block",
        }}
      >
        {livestream.countdownString}
      </div>
    }
  />
);
