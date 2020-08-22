import React, {useEffect, useState} from 'react';
import Radium from 'radium';
import { style } from './style';
import Loader from './Graphics/Loader';

const Article = Radium (({ article }) => {

    const [object, setObject] = useState(null);
    useEffect(() => { article().then(setObject) }, [article]);

    return <div style={{padding: style.padding}}>
        {object ? [
            <div style={{ display: 'flex', justifyContent: 'space-between' }} key='title'>
                <h1 style={{
                    ...style.serif,
                    marginTop: 0,
                    paddingBottom: 20,
                    borderBottom: '1px solid #ddd',
                }}>{object.title}</h1>
            </div>,
            <div key='content' style={{overflowWrap: 'break-word', lineHeight: 1.5}} dangerouslySetInnerHTML={{__html: object.content}}></div>
        ] : <Loader></Loader>}
    </div>;
});

export default Article;
