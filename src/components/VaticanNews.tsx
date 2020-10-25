import Radium from "radium";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../util/config";
import NewsLayout from "./NewsLayout";
import NewsArticle from "./NewsArticle";

export default Radium(() => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/vaticannews-v1/`)
      .then((x) => x.json())
      .then((x) => setArticles(x));
  }, []);
  return (
    <NewsLayout>
      <NewsArticle
        article={articles?.[0]}
        area="a"
        textStyle={{ fontSize: 22 }}
      />
      <NewsArticle article={articles?.[1]} area="b" />
      <NewsArticle article={articles?.[2]} area="c" />
    </NewsLayout>
  );
});
