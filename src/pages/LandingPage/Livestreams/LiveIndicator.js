import React, { useEffect, useState } from "react";

export default ({ size }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const i = setTimeout(() => setActive(!active), 1500);
    return () => {
      clearTimeout(i);
    };
  }, [active]);
  return (
    <div style={{ display: "inline-block", width: size, height: size }}>
      <div
        style={{
          display: "inline-block",
          width: size,
          height: size,
          background: "#d00",
          borderRadius: size / 2,
          opacity: active ? 1 : 0,
          boxShadow: "rgba(221, 0, 0, 0.5) 0px 0px 0px 4px",
          transition: "all 1.5s",
        }}
      ></div>
    </div>
  );
};
