import React, {useEffect, useState} from 'react';
import Radium from 'radium';
//import {style} from './style';
import ContentfulClient from './contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { style } from './style';

const Article = Radium (({ id }) => {

    const [entry, setEntry] = useState();
    const [content, setContent] = useState();
    useEffect(() => {
        ContentfulClient.getEntry(id).then(entry => {
            setEntry(entry);
            console.log(entry);
            return documentToHtmlString(entry.fields.inhalt, {
                renderNode: {
                    [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
                    `<img src="${fields.file.url}" style="max-width: 100%" alt="${fields.description}"/>`,
                    [MARKS.]: ({ data: { target: { fields }}}) =>
                    `<img src="${fields.file.url}" style="max-width: 100%" alt="${fields.description}"/>`,
                },
            });
        }).then(html => {
            setContent(html);
            console.log(html);
        });
    }, [id]);

    return <div style={{padding: 40}}>
        <h1 style={{
            ...style.serif,
            paddingBottom: 5,
            borderBottom: '1px solid #ddd',
            }}>{entry?.fields.title}</h1>
        <div dangerouslySetInnerHTML={{__html: content}} style={{...style.serif}}></div>
    </div>;
});

export default Article;
