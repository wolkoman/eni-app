import Radium from "radium";
import React from "react";
import { style } from "../util/style";
import Loader from "../Graphic/Loader";

export interface NewsArticleDto {
  link: string;
  image: string;
  title: string;
}
export default Radium(
  ({
    article,
    area,
    textStyle = {},
  }: {
    article: NewsArticleDto | null;
    area: string;
    textStyle?: any;
  }) => {
    return (
      <a
        href={article?.link ?? ""}
        style={{
          ...style.shadowed,
          gridArea: area,
          height: "100%",
          cursor: "pointer",
          color: style.dark,
          textDecoration: "none",
        }}
      >
        {article ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                flexGrow: 1,
                backgroundImage: `url(${article.image})`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
              }}
            ></div>
            <div
              style={{
                ...style.serif,
                backgroundColor: "white",
                padding: 20,
                ...textStyle,
              }}
            >
              {article.title}
            </div>
          </div>
        ) : (
          <Loader></Loader>
        )}
      </a>
    );
  }
);
