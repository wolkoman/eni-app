import React, { useEffect, useState } from "react";
import Box from "./Box";
import { style } from "../util/style";
import { localStorageGet, localStorageSet, toDisplayDate } from "../util/utils";
import cockpit from "../util/cockpit";

const INSTAGRAM_STORAGE = "instagram";
const INSTAGRAM_ENABLED = "instagram_enabled";

export default () => {
  const [data, setData] = useState(localStorageGet(INSTAGRAM_STORAGE));
  const [enabled, setEnabled] = useState(
    localStorageGet(INSTAGRAM_ENABLED, [])
  );
  useEffect(() => {
    fetch(`https://www.instagram.com/eni.wien/?__a=1`)
      .then((x) => x.json())
      .then((x) => {
        let nodes = x.graphql.user.edge_owner_to_timeline_media.edges;
        localStorageSet(INSTAGRAM_STORAGE, nodes);
        setData(nodes);
      });
    cockpit.singleton("instagram").then(({ enabled }) => {
      localStorageSet(INSTAGRAM_ENABLED, enabled);
      setEnabled(enabled);
    });
  }, []);
  return enabled && data !== null ? (
    <Box label="Eindrücke" styled={false} padded={false}>
      <div style={{ display: "flex", width: "100%", overflowX: "scroll" }}>
        {data.slice(0, 5).map((post: any) => (
          <Post post={post} key={post.node.id} />
        ))}
      </div>
    </Box>
  ) : null;
};

const Post = ({ post: { node } }: { post: { node: any } }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      marginLeft: 10,
      marginRight: 20,
      marginBottom: 10,
      background: "white",
      flexShrink: 0,
      width: 300,
      ...style.shadowed,
    }}
  >
    <div
      style={{
        padding: "10px 20px",
        color: "grey",
      }}
    >
      {toDisplayDate(new Date(node.taken_at_timestamp * 1000))}
    </div>
    <img
      src={node.thumbnail_src}
      alt={node.accessibility_caption}
      style={{
        width: 300,
        marginBottom: 0,
      }}
    />
    <div
      style={{ padding: 20, maxHeight: 120, overflowY: "auto" }}
      dangerouslySetInnerHTML={{
        __html: node.edge_media_to_caption.edges[0].node.text.replace(
          /\n/g,
          "<br>"
        ),
      }}
    />
  </div>
);
