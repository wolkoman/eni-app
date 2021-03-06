import React from "react";
import Radium from "radium";
import { style } from "../util/style";
import Box from "./Box";

const Churches = Radium(() => {
  return (
    <Box label="Pfarren" styled={false}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "200px",
          columnGap: 20,
          [style.mobile]: { columnGap: 5 },
        }}
      >
        <Church
          name="emmaus"
          picture="emmaus.png"
          color={style.accent1}
          link="https://tesarekplatz.at"
        ></Church>
        <Church
          name="neustift"
          picture="neustift.png"
          color={style.accent2}
          link="https://www.erzdioezese-wien.at/pages/pfarren/9233"
        ></Church>
        <Church
          label="st. nikolaus"
          name="nikolaus"
          picture="nikolaus.png"
          color={style.accent3}
          link="https://pfarresanktnikolaus.at"
        ></Church>
      </div>
    </Box>
  );
});

const Church = Radium(
  ({
    name,
    picture,
    label,
    color,
    link,
  }: {
    name: string;
    picture: string;
    label?: string;
    color: string;
    link: string
  }) => {
    return (
      <a
        href={link}
        style={{
          position: "relative",
          ...style.shadowed,
          cursor: "pointer",
          textDecoration: "none",
          background: `linear-gradient(180deg, ${color}, white)`,
        }}
      >
        <div
          style={{
            height: 2,
            width: "100%",
            background: "black",
            position: "absolute",
            top: "calc(100% - 40px)",
          }}
        />
        <div
          style={{
            position: "relative",
            backgroundImage: `url(/miniatures/${picture})`,
            height: "calc(100% - 38px)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        />
        <div
          style={{
            ...style.serif,
            fontSize: "20px",
            padding: "5px 0",
            textAlign: "center",
            background: "white",
            color: "black",
          }}
        >
          {label ?? name}
        </div>
      </a>
    );
  }
);

export default Churches;
