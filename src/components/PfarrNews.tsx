import Radium from "radium";
import React, { useEffect, useState } from "react";
import { NewsArticleDto } from "./NewsArticle";
import cockpit, { host } from "../util/cockpit";

interface CockpitArticle {
  author: string;
  content: string;
  layout: CockpitArticleLayout[];
  preview_image: { path: string };
  platform: string[];
  title: string;
  _id: string;
}
type CockpitArticleLayout =
  | { component: "text"; settings: { text: string } }
  | { component: "gallery"; settings: { gallery: { path: string }[] } };

export default Radium(() => {
  const [articles, setArticles] = useState<NewsArticleDto[]>([]);
  const [x, setX] = useState<any>();
  const addArticles = (articles: NewsArticleDto[]) =>
    setArticles(articles.concat(...articles));
  useEffect(() => {
    cockpit
      .collection("article")
      .then(({ entries }: { entries: CockpitArticle[] }) =>
        addArticles(
          entries
            .filter((entry) => entry.platform.includes("emmaus"))
            .map(
              (entry) =>
                ({
                  image: `${host}${entry.preview_image.path}`,
                  link: `https://tesarekplatz.at/beitrag/${entry._id}`,
                  title: entry.title,
                } as NewsArticleDto)
            )
        )
      );
    fetch("https://www.pfarresanktnikolaus.at/wp/?feed=rss2")
      .then((x) => x.text())
      .then((x) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(x, "text/xml");
        setX(xml);
      });
  }, []);
  return (
    <div>
      {JSON.stringify(x)}
      {/*<NewsLayout>
        <NewsArticle
          article={articles?.[0]}
          area="a"
          textStyle={{ fontSize: 22 }}
        />
        <NewsArticle article={articles?.[1]} area="b" />
        <NewsArticle article={articles?.[2]} area="c" />
      </NewsLayout>*/}
    </div>
  );
});
