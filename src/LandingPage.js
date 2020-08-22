import React from "react";
import Title from "./Title";
import Churches from "./Churches";
import Box from "./Box";
import Events from "./Events/Events";
import { Livestreams } from './Livestreams/Livestreams';
import ArticleSnippets from './ArticleSnippet';

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
    <Box label="Vatikan Nachrichten" styled={false}>
      <ArticleSnippets></ArticleSnippets>
    </Box>
  </div>
);
