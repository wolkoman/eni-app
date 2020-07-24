import React from 'react';
import Radium from 'radium';
import ReactMarkdown from 'react-markdown';
import { style } from './style';

const Markdown = Radium(({ source, html=false, headingOffset=0, renderers={} }) => {

    return <ReactMarkdown
        source={source}
        escapeHtml={!html}
        renderers={{
            ...renderers,
            heading: (input) => {
                const Header = `h${input.level+headingOffset}`;
                return <Header style={style.serif}>{input.children}</Header>;
            }
        }}
  />;
});

export default Markdown;