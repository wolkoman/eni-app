import React, { useEffect, useState } from "react";
import Radium from "radium";
import { style } from "../util/style";
import Loader from "../Graphic/Loader";
import cockpit, { host } from "../util/cockpit";

interface Article {
  title: string;
  content: string;
  layout?: TextSection[];
  author?: string;
}
interface TextSection {
  component: "text";
  settings: { text: string };
}
const Article = Radium(({ article }: { article: () => Promise<Article> }) => {
  const [object, setObject] = useState<Article>();
  const [error, setError] = useState(false);
  useEffect(() => {
    article()
      .then(setObject)
      .catch(() => setError(true));
  }, [article]);

  return (
    <div style={{ padding: style.padding, [style.mobile]: { padding: 0 } }}>
      {error ? (
        <div style={{ fontStyle: "italic" }}>
          Dieser Artikel existiert nicht.
        </div>
      ) : object ? (
        <div>
          <div
            style={{
              borderBottom: "1px solid #ddd",
            }}
            key="title"
          >
            <h1
              style={{
                ...style.serif,
                marginTop: 0,
              }}
            >
              {object.title}
            </h1>
            {object.author ? (
              <div
                style={{
                  marginBottom: 20,
                  ...style.serif,
                  fontStyle: "italic",
                }}
              >
                von {object.author}
              </div>
            ) : null}
          </div>
          {object.layout ? (
            object.layout.map((l, index) => (
              <LayoutComponent layout={l} key={index} />
            ))
          ) : (
            <div
              key="content"
              style={{ overflowWrap: "break-word", lineHeight: 1.5 }}
              dangerouslySetInnerHTML={{ __html: object.content }}
            ></div>
          )}
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
});

const LayoutComponent = Radium(({ layout }: { layout: any }) => {
  return {
    text: (
      <div
        style={{ overflowWrap: "break-word", lineHeight: 1.5 }}
        dangerouslySetInnerHTML={{ __html: layout.settings.text }}
      />
    ),
    gallery: (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridGap: 10,
        }}
      >
        {layout.settings.gallery?.map((entry: any) => (
          <div style={{ marginBottom: 10 }}>
            <img
              src={`${host}${entry.path}`}
              style={{ width: "100%", maxWidth: 800 }}
            />
            <div style={{ padding: 5, background: "#ddd" }}>
              {entry.meta.title}
            </div>
          </div>
        ))}
      </div>
    ),
  }[layout.component as "text" | "gallery"];
});

export default Article;
