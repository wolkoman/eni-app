import React from "react";
import Radium from "radium";
import ReactMarkdown from "react-markdown";
import { style } from "../util/style";

const Markdown = Radium(
  ({
    source,
    html = false,
    headingOffset = 0,
    renderers = {},
  }: {
    source: string;
    html?: boolean;
    headingOffset?: number;
    renderers?: any;
  }) => {
    return (
      <ReactMarkdown
        source={source}
        escapeHtml={!html}
        renderers={{
          ...renderers,
          heading: (input) => {
            const Header: any = `h${input.level + headingOffset}`;
            return <Header style={style.serif}>{input.children}</Header>;
          },
        }}
      />
    );
  }
);

export default Markdown;
