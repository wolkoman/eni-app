import React from "react";
import Radium from "radium";
import { style } from "./style";
import { Link } from "react-router-dom";

const Churches = Radium(() => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "200px",
        columnGap: 20,
        [style.mobile]: { columnGap: 5 },
      }}
    >
      <Church name="emmaus" picture="kirchen-01.svg" first={true}></Church>
      <Church name="nikolaus" picture="kirchen-02.svg"></Church>
      <Church
        name="neustift"
        label="inzersdorf - neustift"
        picture="kirchen-03.svg"
      ></Church>
    </div>
  );
});

const Church = Radium(({ name, picture, label }) => {
  return (
    <Link
      to={`/${name}`}
      style={{
        ...style.shadowed,
        cursor: "pointer",
        transition: "all .1s",
        textDecoration: "none",
        color: "black",
        ":hover": { transform: "scale(1.02)", ...style.highlyShadowed },
      }}
    >
      <div
        style={{
          backgroundImage: `url(${picture})`,
          height: "calc(100% - 40px)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        style={{
          ...style.serif,
          fontSize: "20px",
          padding: "5px 0",
          textAlign: "center",
        }}
      >
        {label ?? name}
      </div>
    </Link>
  );
});

export default Churches;
