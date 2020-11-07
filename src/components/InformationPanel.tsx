import React, { useState } from "react";
import Radium from "radium";
import {
  FaCalendarAlt,
  FaFileDownload,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Box from "./Box";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { State } from "../store/state";

const InformationPanel = ({ state }: { state: State }) => {
  return (
    <Box label="Weiteres">
      <div style={{ display: "flex", margin: "0 20px" }}>
        <Info
          label="YouTube"
          link="http://www.youtube.com/channel/UCty97x9ptrFsKhX5M_QA58g"
          color="red"
          outsideLink={true}
        >
          <FaYoutube />
        </Info>
        <Info
          label="Instagram"
          link="http://www.instagram.com/eni.wien/"
          color="#e73c59"
          outsideLink={true}
        >
          <FaInstagram />
        </Info>
        <Info label="Downloads" link="/resources" color="#0b5cc1">
          <FaFileDownload />
        </Info>
        {state.auth.userdata ? (
          <Info label="Einteilung" link="/einteilung" color="orange">
            <FaCalendarAlt />
          </Info>
        ) : null}
      </div>
    </Box>
  );
};

const Info = Radium(
  ({
    label,
    children,
    link,
    outsideLink = false,
    color,
  }: {
    label: string;
    children: React.ReactNode;
    link: string;
    outsideLink?: boolean;
    color: string;
  }) => {
    const [hover, setHover] = useState(false);
    const child = (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",

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
      </div>
    );
    return outsideLink ? (
      <a href={link} children={child} style={{ textDecoration: "none" }} />
    ) : (
      <Link to={link} children={child} style={{ textDecoration: "none" }} />
    );
  }
);

export default connect(
  (state: State) => ({
    state,
  }),
  {}
)(InformationPanel);
