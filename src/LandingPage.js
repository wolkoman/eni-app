import React from "react";
import Title from "./Title";
import Churches from "./Churches";
import Box from "./Box";
import Events from "./Events/Events";
import { Livestreams } from "./Livestreams/Livestreams";
import ArticleSnippets from "./ArticleSnippet";
import Announcement from "./Announcement";
import Corona from "./Corona";
import Instagram from "./Instagram";

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
    <Corona />
    <Instagram />
    <Box label="Vatikan Nachrichten" styled={false}>
      <ArticleSnippets></ArticleSnippets>
    </Box>
  </div>
);
