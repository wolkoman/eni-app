import React, { useState, useEffect } from "react";
import Box from "../../../components/Box";
import Cockpit from "../../../util/cockpit";
import { parseLivestreams } from "./livestreamParser";
import Livestream from "./Livestream";
import { localStorageGet, localStorageSet } from "../../../util/utils";
import { style } from "../../../util/style";

export default () => {
  const LIVESTREAM = "livestream";
  const [now, setNow] = useState(new Date().getTime());
  const [livestreams, setLivestreams] = useState(
    localStorageGet(LIVESTREAM) ?? []
  );
  const [parsedLivestreams, setParsedLivestreams] = useState(
    parseLivestreams(livestreams, now)
  );

  useEffect(() => {
    const update = () =>
      Cockpit.collection("livestream").then(({ entries }) => {
        localStorageSet(LIVESTREAM, entries);
        setLivestreams(entries);
      });
    update();
    const interval = setInterval(update, 10 * 60 * 1000);
    const timeout = setInterval(() => setNow(new Date().getTime()), 1000);
    return () => {
      clearInterval(timeout);
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    setParsedLivestreams(parseLivestreams(livestreams, now));
  }, [now, livestreams]);

  return parsedLivestreams.length === 0 ? null : (
    <Box label="Livestream">
      <div style={{ padding: "20px 40px", color: style.dark }}>
        {parsedLivestreams.map((l, i) => (
          <Livestream livestream={l} key={l._id} now={now} index={i} />
        ))}
      </div>
    </Box>
  );
};
