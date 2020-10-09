import Radium from "radium";
import React, { useEffect, useState } from "react";
import { style } from "../../style";
import Loader from "../../Graphic/Loader";
import { apiUrl } from "../../config";

const ArticleSnippet = Radium(({ article, area, textStyle }) => {
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
});

const ArticleSnippets = Radium(() => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/vaticannews-v1/`)
      .then((x) => x.json())
      .then((x) => setArticles(x));
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplate: '"a a b" 200px "a a c" 200px',
        [style.mobile]: {
          gridTemplate: '"a" 300px "b" 200px "c" 200px',
          margin: "0 20px",
        },
        gridGap: 20,
      }}
    >
      <ArticleSnippet
        article={articles?.[0]}
        area="a"
        textStyle={{ fontSize: 22 }}
      ></ArticleSnippet>
      <ArticleSnippet article={articles?.[1]} area="b"></ArticleSnippet>
      <ArticleSnippet article={articles?.[2]} area="c"></ArticleSnippet>
    </div>
  );
});

export default ArticleSnippets;
