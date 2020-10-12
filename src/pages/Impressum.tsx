import React from "react";
import Article from "../components/Article";
import Box from "../components/Box";
import Cockpit from "../util/cockpit";

export default () => (
  <div>
    <Box label="">
      <Article article={() => Cockpit.singleton("impressum")} />
    </Box>
  </div>
);
