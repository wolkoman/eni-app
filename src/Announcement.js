import React, { useEffect, useState } from "react";
import cockpit from "./cockpit";
import Box from "./Box";
import Markdown from "./Markdown";

const ANNOUNCEMENT = "announcement";

export default () => {
  const [announcement, setAnnouncement] = useState(
    JSON.parse(localStorage.getItem(ANNOUNCEMENT)) ?? {}
  );
  useEffect(() => {
    cockpit.singleton("announcement").then((announcement) => {
      setAnnouncement(announcement);
      localStorage.setItem(ANNOUNCEMENT, JSON.stringify(announcement));
    });
  }, []);
  return announcement?.active ? <Box label={announcement?.title} padded={true}><Markdown source={announcement?.content} headingOffset={1}/></Box> : null
};
