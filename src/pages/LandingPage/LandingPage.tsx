import React from "react";
import Announcement from "../../components/Announcement";
import VaticanNews from "../../components/VaticanNews";
import Box from "../../components/Box";
import Churches from "../../components/Churches";
import Events from "./Events/Events";
import Instagram from "../../components/Instagram";
import Livestreams from "./Livestreams/Livestreams";
import Title from "./Title";

export default () => (
  <div>
    <Title></Title>
    <Livestreams />
    <Box label="Pfarren" styled={false}>
      <Churches></Churches>
    </Box>
    <Box label="Termine">
      <Events></Events>
    </Box>
    <Announcement />
    <Instagram />
    <Box label="Vatikan Nachrichten" styled={false}>
      <VaticanNews />
    </Box>
  </div>
);
