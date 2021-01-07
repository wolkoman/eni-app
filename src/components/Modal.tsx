import React, { ReactNode, useEffect } from "react";
import Box from "./Box";

export default ({ children }: { children?: ReactNode }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background: "grey",
          opacity: 0.3,
          zIndex: 100,
        }}
      ></div>

      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: 400,
          maxWidth: "100%",
          zIndex: 100,
        }}
      >
        <Box label="" padded={true}>
          {children}
        </Box>
      </div>
    </div>
  );
};
