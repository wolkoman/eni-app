import React, { useState, useEffect } from "react";
import { STATE_WAIT, STATE_OVER, STATE_LIVE } from "./livestreamParser";
import LivestreamLive from "./LivestreamLive";
import LivestreamOver from "./LivestreamOver";
import LivestreamWait from "./LivestreamWait";

export default ({ livestream, index }) => {
    const [loaded] = useState(new Date().getTime());
    useEffect(() => {
      if (loaded < livestream.publish && livestream.state === STATE_LIVE)
        window.location.href = livestream.url;
    }, [livestream, loaded]);
  
    return (
      <div
        style={{ borderTop: index === 0 ? null : "1px solid #ccc" }}
        children={React.createElement(
          {
            [STATE_LIVE]: LivestreamLive,
            [STATE_OVER]: LivestreamOver,
            [STATE_WAIT]: LivestreamWait,
          }[livestream.state],
          { livestream, index }
        )}
      />
    );
  };



