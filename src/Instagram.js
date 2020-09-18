import React, { useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import Box from "./Box";
import { apiUrl } from "./config";
import { style } from "./style";
import { localStorageGet, localStorageSet, toDisplayDate } from "./utils";

const INSTAGRAM_STORAGE = "instagram";

export default () => {
  const [data, setData] = useState(localStorageGet(INSTAGRAM_STORAGE));
  useEffect(() => {
    fetch(`${apiUrl}/instagram/v1/`)
      .then((x) => x.json())
      .then((x) => {
        localStorageSet(INSTAGRAM_STORAGE, x);
        setData(x);
      });
  });
  return (
    <Box label="Eindrücke" styled={false}>
      <div style={{ display: "flex", width: "100%", overflowX: "scroll" }}>
        {data.slice(0, 3).map((post) => (
          <Post post={post} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${style.light})`,
        }}
      />
    </Box>
  );
};

const Post = ({ post }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      marginLeft: 10,
      marginRight: 20,
      marginBottom: 10,
      background: "white",
      borderRadius: style.borderRadius,
      flexShrink: 0,
      width: 300,
      ...style.shadowed,
    }}
  >
    <div
      style={{
        padding: "10px 20px",
        textTransform: "uppercase",
        color: "grey",
      }}
    >
      {toDisplayDate(new Date(post.node.taken_at_timestamp * 1000))}
    </div>
    <img
      src={post.node.thumbnail_src}
      style={{
        width: 300,
        marginBottom: 0,
        borderRadius: style.borderRadius,
      }}
    />
    <div
      style={{ padding: 20 }}
      dangerouslySetInnerHTML={{
        __html: post.node.edge_media_to_caption.edges[0].node.text.replace(
          /\n/g,
          "<br>"
        ),
      }}
    />
  </div>
);
