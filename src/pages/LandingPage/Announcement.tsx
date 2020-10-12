import React, { useEffect, useState } from "react";
import cockpit from "../../util/cockpit";
import Box from "../../components/Box";
import Markdown from "../../Markdown";
import { localStorageGet, localStorageSet } from "../../util/utils";

const ANNOUNCEMENT = "announcement";

export default () => {
  const [announcement, setAnnouncement] = useState<{
    title: string;
    content: string;
    active: boolean;
  }>(localStorageGet(ANNOUNCEMENT));
  useEffect(() => {
    cockpit.singleton("announcement").then((announcement) => {
      setAnnouncement(announcement);
      localStorageSet(ANNOUNCEMENT, announcement);
    });
  }, []);
  return announcement !== null && announcement?.active ? (
    <Box label={announcement?.title} padded={true} styled={true}>
      <Markdown source={announcement?.content} headingOffset={1} />
    </Box>
  ) : null;
};
