import React, { useState, useEffect } from "react";
import Box from "./Box";
import wochenblattGenerator from "./wochenblatt-generator";
import Loader from "./graphics/Loader";
import cockpit, { host } from "./cockpit";

export default () => {
  const [template, setTemplate] = useState();
  useEffect(() => {
    cockpit.singleton("wochenblatt").then(({ template }) => setTemplate(`${host}/${template}`));
  }, []);
  return template === null ? (
    <Loader />
  ) : (
    <Box label="Wochenblatt" padded={true}>
      <button
        onClick={() => wochenblattGenerator({ templateDocumentPath: 'http://lvh.me:3000/wochenblatt.docx' ?? template })}
      >
        Generate
      </button>
    </Box>
  );
};
