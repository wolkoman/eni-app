import React from "react";
import Box from "../components/Box";
import { Autorisation, useRequireAutorisation } from "../util/authorisation";

export default () => {
  useRequireAutorisation(Autorisation.ORGANIST);

  return <Box label="Einteilung" padded={true} styled={true}></Box>;
};
