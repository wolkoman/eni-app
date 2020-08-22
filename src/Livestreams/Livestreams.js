import React, { useState, useEffect } from "react";
import Box from "../Box";
import Cockpit from "../cockpit";
import { parseLivestreams } from "./livestreamParser";
import Livestream from "./Livestream";

export const Livestreams = () => {
  const NEXT_LIVESTREAM = "nextLivestream";
  const [now, setNow] = useState(new Date().getTime());
  const [livestreams, setLivestreams] = useState(
    JSON.parse(localStorage.getItem(NEXT_LIVESTREAM)) ?? []
  );
  const [parsedLivestreams, setParsedLivestreams] = useState(
    parseLivestreams(livestreams, now)
  );

  useEffect(() => {
    const update = () =>
      Cockpit.collection("livestream").then(({ entries }) => {
        localStorage.setItem(NEXT_LIVESTREAM, JSON.stringify(entries));
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
    <Box padded={true} label="Livestream">
      {parsedLivestreams.map((l, i) => (
        <Livestream livestream={l} key={l._id} now={now} index={i} />
      ))}
    </Box>
  );
};

