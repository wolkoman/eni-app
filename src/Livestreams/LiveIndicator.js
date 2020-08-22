import React, {useEffect, useState} from "react";

export default ({ size }) => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const i = setTimeout(() => setActive(!active), 1000);
        return () => {clearTimeout(i)};
    }, [active]);
    return <div style={{ display: "inline-block", width: size + 10 }}>
    <div
      style={{
        display: "inline-block",
        width: size,
        height: size,
        background: "red",
        borderRadius: size/2,
        opacity: active?1:0,
        transition: 'opacity 1s'
      }}
    ></div>
  </div>
};
