import React from "react";
import Article from "../Article";
import Box from "../Box";
import Cockpit from "../cockpit";

export default () => (
  <div>
    <Box>
      <Article article={() => Cockpit.singleton("impressum")}></Article>
    </Box>
  </div>
);
