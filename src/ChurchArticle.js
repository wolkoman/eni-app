import React, {useEffect, useState} from 'react';
import Radium from 'radium';
import { style } from './style';
import Loader from './graphics/Loader';
import Markdown from './Markdown';
import Box from './Box';
import { host } from './cockpit';


const ChurchArticle = Radium (({ entry }) => {

    const teamRenderer = {
        image: (options) => <Person name={options.alt?.split('|')?.[0]} descriptions={options.alt?.split('|')?.[1]?.split('-')} imageSource={options.src}/>,
        paragraph: (options) => <div>{options.children}</div>,
    };
    const [object, setObject] = useState(null);
    useEffect(() => { entry().then(setObject) }, [entry]);

    return <div style={{
            [style.mobile]: { padding: 20 }
        }}>
        {object ? <div>
            <Box padded={false}>
                <h1 style={{...style.serif, padding: 40}}>{object.name}</h1>
            </Box>
            <Box label="Allgemein">
                <div style={{ display: 'flex', [style.mobile]: { flexDirection: 'column' } }}>
                    <div style={{ backgroundImage: `url(${host}${object.image.path})`, backgroundSize: 'cover', width: '100%', backgroundPosition: 'center', [style.mobile]: { height: 300 } }}></div>
                    <div style={{padding: style.padding}}>
                        <Markdown source={object.info} headingOffset={2}/>
                    </div>
                </div>
            </Box>
            {object.extended ? <div>
            
            <Box label="Team">
                <div style={{height: 400, overflow: 'auto', padding: style.padding, display: 'flex', justifyContent: 'stretch', [style.maxmedia(800)]: { flexDirection: 'column' }}}>
                    <div style={{ flexGrow: 1 }}>
                        <Markdown source={object.team} headingOffset={2} renderers={teamRenderer}/>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <Markdown source={object.team2} headingOffset={2} renderers={teamRenderer}/>
                    </div>
                </div>
            </Box>
            
            <Box label="Kontakt" padded={false}>
                <div style={{padding: style.padding}}>
                    <Markdown source={object.contact} headingOffset={2}/>
                </div>
                <iframe title="Karte" frameborder="0" style={{
                    width: '100%',
                    height: 600,
                    frameBorder: 0,
                    scrolling: 'no',
                }} width="100%" src={object.map}></iframe>
            </Box>

            </div> : null}

        </div> : <Loader></Loader>}
    </div>;
});

const Person = Radium(({name, descriptions, imageSource}) => {
    const size = 50;
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    }}>
        <div style={{
            backgroundImage: `url(${imageSource})`,
            backgroundColor: '#ccc',
            backgroundSize: 'cover',
            width: size,
            height: size,
            borderRadius: size,
            marginRight: 10
        }}></div>
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ fontSize: 18 }}>
                {name}
            </div>
            {descriptions?.map((text,i) =>
                <div key={i} style={{opacity: .8, marginBottom: 2,  fontSize: 14}}>{text}</div>
            )}
        </div>
    </div>
});

export default ChurchArticle;
