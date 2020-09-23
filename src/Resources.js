import React, { useEffect, useState } from "react";
import Box from "./Box";
import cockpit, { host } from "./cockpit";

export default () => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    cockpit.collection("Resources").then((x) => setResources(x.entries));
  });
  return (
    <Box label="Resourcen" styled={true} padded={true}>
      {resources.map((resource) => (
        <a
          href={`${host}/${resource.file}`}
          style={{ display: "block", color: "black", margin: "10px 0" }}
        >
          {resource.name}
        </a>
      ))}
    </Box>
  );
};
