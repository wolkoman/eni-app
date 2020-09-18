import React from "react";
import Radium from "radium";
import { Link } from "react-router-dom";
import { FaEye, FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = Radium(() => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 20,
      }}
    >
      {[
        <FooterItem
          link="/impressum"
          title="Impressum & Datenschutz"
          icon={<FaEye />}
        ></FooterItem>,
        <FooterItem
          link="//github.com/wolkoman/eni"
          title="Github"
          icon={<FaGithub />}
          hard={true}
        ></FooterItem>,
        <FooterItem
          link="//www.youtube.com/channel/UCty97x9ptrFsKhX5M_QA58g"
          icon={<FaYoutube />}
          title="YouTube"
          hard={true}
        ></FooterItem>,
        <FooterItem
          link="//www.instagram.com/eni.wien/"
          title="Instagram"
          icon={<FaInstagram />}
          hard={true}
        ></FooterItem>,
      ]
        .map((item, index) => [
          index === 0 ? null : (
            <FooterSeperator key={index + "s"}></FooterSeperator>
          ),
          { ...item, key: index },
        ])
        .flat()}
    </div>
  );
});

const FooterItem = Radium(
  ({ link, title, hard = false, onClick, icon = null }) => {
    return hard ? (
      <a
        href={link}
        onClick={onClick}
        style={{
          color: "grey",
          textDecoration: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon ? (
          <div style={{ marginRight: 3, marginTop: 6 }}>{icon}</div>
        ) : null}
        {title}
      </a>
    ) : (
      <Link
        to={link}
        style={{
          color: "grey",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {icon ? (
          <div style={{ marginRight: 3, marginTop: 6 }}>{icon}</div>
        ) : null}
        {title}
      </Link>
    );
  }
);
const FooterSeperator = Radium(() => {
  return <div style={{ margin: "4px 10px", color: "grey" }}>–</div>;
});

export default Footer;
