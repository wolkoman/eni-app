import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import Box from './Box';
import Cockpit from './cockpit';
import { style } from './style';
import { humanDateFormat } from './utils';

export const Livestream = Radium(() => {

    const NEXT_LIVESTREAM = 'nextLivestream';
    const [nextLivestream, setNextLivestream] = useState(null);
    const [now, setNow] = useState(new Date().getTime());
    const publish_start = new Date(nextLivestream?.publish_start).getTime();
    const publish_end = new Date(nextLivestream?.publish_end).getTime();
    const shown = nextLivestream !== null && (publish_start - now < 0) && (publish_end - now > 0);
    const live = new Date(`${nextLivestream?.date} ${nextLivestream?.time}`).getTime() - now < 0;
    let timeout;

    useEffect(() => {
        setNextLivestream(JSON.parse(localStorage.getItem(NEXT_LIVESTREAM)));
        Cockpit.collection('livestream').then(livestreams => {
            const livestream = livestreams?.entries[0];
            localStorage.setItem(NEXT_LIVESTREAM, JSON.stringify(livestream));
            setNextLivestream(livestream);
        });
        timeout = setInterval(() => setNow(new Date().getTime()), 1000);
        return () => clearInterval(timeout);
    }, []);

    return shown ? <Box label="Livestream">
        {live 
            ? <Player livestream={nextLivestream}></Player>
            : <WaitNotice livestream={nextLivestream}></WaitNotice>
        }
    </Box> : null;
});

const WaitNotice = Radium(({livestream}) => <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: style.padding,
        [style.mobile]: { flexDirection: 'column' },
        }}>
    <div>Der Livestream <b>{livestream.title}</b> beginnt am {humanDateFormat(livestream.date)} um {livestream.time} Uhr.</div>    
    <div></div>
</div>);
const Player = Radium(({livestream, autoplay=false}) => <iframe style={{ width: '100%', height: 400 }} src={`https://www.youtube.com/embed/${livestream?.URL.split(`?v=`)[1]}${autoplay ? '?autoplay=1' : ''}`} frameborder="0" allow="autoplay;encrypted-media;picture-in-picture" allowfullscreen></iframe>);