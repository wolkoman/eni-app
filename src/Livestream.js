import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import Box from './Box';
import Cockpit from './cockpit';
import { style } from './style';
import { humanDateFormat, pad } from './utils';

export const Livestream = Radium(() => {

    const NEXT_LIVESTREAM = 'nextLivestream';
    const [livestreamEntity, setLivestreamEntity] = useState(null);
    const [livestream, setLivestream] = useState(null);
    const [now, setNow] = useState(new Date().getTime());
    const [loaded] = useState(new Date().getTime());

    useEffect(() => {
        setLivestreamEntity(JSON.parse(localStorage.getItem(NEXT_LIVESTREAM)));
        let update = () => Cockpit.collection('livestream').then(livestreams => {
            const livestream = livestreams?.entries[0];
            localStorage.setItem(NEXT_LIVESTREAM, JSON.stringify(livestream ?? {}));
            setLivestreamEntity(livestream);
        });
        update();
        let interval = setInterval(update, 10 * 60 * 1000);
        let timeout = setInterval(() => setNow(new Date().getTime()), 1000);
        return () => {clearInterval(timeout); clearInterval(interval);};
    }, []);
    useEffect(() => {
        const publish_start = new Date(livestreamEntity?.publish_start).getTime();
        const publish_end = new Date(livestreamEntity?.publish_end).getTime();
        const shown = livestreamEntity !== null && (publish_start - now < 0) && (publish_end - now > 0);
        const airTime = new Date(`${livestreamEntity?.date} ${livestreamEntity?.time}`).getTime();
        const live = airTime - (+livestreamEntity?.prepublish_time) * 60000 - now < 0;
        const autoplay = loaded < airTime;
        setLivestream({...livestreamEntity, publish_start, publish_end, shown, live, autoplay, airTime});
    }, [livestreamEntity, now, loaded]);

    return livestream?.shown ? <Box label={livestream.type}>
        {livestream.live 
            ? <Player livestream={livestream}></Player>
            : <WaitNotice livestream={livestream} now={now}></WaitNotice>
        }
    </Box> : null;
});

const WaitNotice = Radium(({livestream, now}) => {
    const time = Math.ceil((livestream?.airTime - now) / 1000);
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [style.mobile]: { flexDirection: 'column' },
        }}>
    <div style={{
        padding: style.padding,
    }}>
        {livestream.type[0]==='L'?'Der':'Die'} {livestream.type} <b>{livestream.title}</b> beginnt am {humanDateFormat(livestream.date)} um {livestream.time} Uhr.<br></br>
        Um {livestream.type[0]==='L'?'ihn':'sie'} anzusehen, bleiben Sie einfach auf dieser Seite.
    </div>    
    <div style={{ 
        padding: style.padding,
        fontSize: 30,
        fontWeight: 'bold',
        display: hours >= 12 ? 'none' : 'block',
    }}>
        {hours !== 0 ? `${pad(hours)}:`:''}{pad(minutes)}:{pad(seconds)}
    </div>
</div>});
const Player = Radium(({livestream}) => 
    <iframe
        title={livestream?.title}
        style={{ width: '100%', height: 400 }}
        src={`https://www.youtube.com/embed/${livestream?.URL.split(`?v=`)[1]}${livestream?.autoplay ? '?autoplay=1' : ''}`}
        frameBorder="0"
        allow="autoplay;encrypted-media;picture-in-picture"
        allowFullScreen
    ></iframe>);