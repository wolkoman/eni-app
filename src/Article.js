import React, {useEffect, useState} from 'react';
import Radium from 'radium';
//import {style} from './style';
import ContentfulClient from './contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { style } from './style';
import Loader from './graphics/Loader';

const Article = Radium (({ id, closeable, onClose = ()=>{} }) => {

    const [entry, setEntry] = useState();
    const [component, setComponent] = useState();
    useEffect(() => {
        ContentfulClient.getEntry(id).then(entry => {
            setEntry(entry);
            setComponent(documentToReactComponents(entry.fields.inhalt, {
                renderNode: {
                    [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
                    <img src={fields.file.url} style={{maxWidth: '100%'}} alt={fields.description}/>,
                },
            }));
        });
    }, [id]);

    return <div style={{padding: 40}}>
        {component ? [
            <div style={{ display: 'flex', justifyContent: 'space-between' }} key='title'>
                <h1 style={{
                    ...style.serif,
                    marginTop: 0,
                    paddingBottom: 20,
                    borderBottom: '1px solid #ddd',
                }}>{entry?.fields.title}</h1>
                { closeable ? <i className="fas fa-times fa-2x" onClick={onClose} style={{ cursor: 'pointer', paddingLeft: 10, flexGrow: 0 }}></i> : null }
            </div>,
            <div key='content' style={{overflowWrap: 'break-word', lineHeight: 1.5}}>{component}</div>
        ] : <Loader></Loader>}
    </div>;
});

export default Article;
