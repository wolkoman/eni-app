import React, { useState } from "react";
import Radium from "radium";
import { FaFileDownload, FaInstagram, FaYoutube } from "react-icons/fa";
import Box from "./Box";

import { CSSProperties } from "react";

type RadiumStyleProp = CSSProperties | undefined | null | boolean;

export function asCSS(
  styles: RadiumStyleProp | RadiumStyleProp[]
): CSSProperties {
  return styles as any;
}

export default () => {
  return (
    <Box label="Weiteres">
      <div style={{ display: "flex", margin: "0 20px" }}>
        <Info
          label="YouTube"
          link="http://www.youtube.com/channel/UCty97x9ptrFsKhX5M_QA58g"
          color="red"
        >
          <FaYoutube />
        </Info>
        <Info
          label="Instagram"
          link="http://www.instagram.com/eni.wien/"
          color="#e73c59"
        >
          <FaInstagram />
        </Info>
        <Info label="Downloads" link="/resources" color="#0b5cc1">
          <FaFileDownload />
        </Info>
      </div>
    </Box>
  );
};

const Info = Radium(
  ({
    label,
    children,
    link,
    color,
  }: {
    label: string;
    children: React.ReactNode;
    link?: string;
    color: string;
  }) => {
    const [hover, setHover] = useState(false);
    return (
      <a
        href={link}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          textDecoration: "none",
          color: "black",
          padding: "30px 40px",
          width: 70,
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: 60,
            opacity: hover ? 1 : 0.5,
            transform: hover ? "scale(1.1)" : "scale(1)",
            transition: "all .3s",
            color,
          }}
        >
          {children}
        </div>
        <div>{label}</div>
      </a>
    );
  }
);
