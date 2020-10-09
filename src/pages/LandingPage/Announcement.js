import React, { useEffect, useState } from "react";
import cockpit from "../../cockpit";
import Box from "../../Box";
import Markdown from "../../Markdown";
import { localStorageGet, localStorageSet } from "../../utils";

const ANNOUNCEMENT = "announcement";

export default () => {
  const [announcement, setAnnouncement] = useState(
    localStorageGet(ANNOUNCEMENT)
  );
  useEffect(() => {
    cockpit.singleton("announcement").then((announcement) => {
      setAnnouncement(announcement);
      localStorageSet(ANNOUNCEMENT, announcement);
    });
  }, []);
  return announcement?.active ? (
    <Box label={announcement?.title} padded={true}>
      <Markdown source={announcement?.content} headingOffset={1} />
    </Box>
  ) : null;
};
