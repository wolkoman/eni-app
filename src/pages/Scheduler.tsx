import React from "react";
import Box from "../components/Box";
import Login from "./Login";

export default () => {
  return (
    <Box label="Einteilung" padded={true} styled={true}>
      <Login></Login>
    </Box>
  );
};
