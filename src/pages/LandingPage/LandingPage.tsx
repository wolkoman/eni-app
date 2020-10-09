import React from "react";
import Announcement from "./Announcement";
import ArticleSnippets from "./ArticleSnippet";
import Box from "../../Box";
import Churches from "./Churches";
import Events from "./Events/Events";
import Instagram from "./Instagram";
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
      <ArticleSnippets></ArticleSnippets>
    </Box>
  </div>
);
