import React, { useState } from 'react';
import Radium from 'radium';
import Article from './Article';
import { style } from './style';

const Churches = Radium(() => {
    const itemGap = 10;
    const itemCount = 3;
    const itemWidth = `calc(100% / ${itemCount} - ${itemGap}px)`;
    const itemLeft = (index) => `calc((100% / ${itemCount} + ${itemGap}px / 2) * ${index})`;
    const [expand, setExpand] = useState(false);
    return <div style={{
        position: 'relative',
        height: expand ? 500 : 200,
        transition: 'all .2s',
    }}>
        <Church
            name='emmaus'
            closedStyle={{ left: itemLeft(0), width: itemWidth }}
            picture='kirchen-01.svg'
            setExpand={setExpand}
            id='53Lgt4kd0qUnPFZszRL8Rk'
        ></Church>
        <Church
            name='neustift'
            closedStyle={{ left: itemLeft(1), width: itemWidth }}
            picture='kirchen-03.svg'
            setExpand={setExpand}
            id='42F2oBzL7K4LA2s8OyfEdz'
        ></Church>
        <Church
            name='inzersdorf'
            closedStyle={{ left: itemLeft(2), width: itemWidth }}
            picture='kirchen-02.svg'
            setExpand={setExpand}
            id='4eVTrqzQN7wDZXu1CWZIVQ'
        ></Church>
  </div>;
});

const Church = Radium(({ name , picture, closedStyle, setExpand, id }) => {
    const [open, setOpen] = useState(false);
    return <div style={{
        ...style.shadowed,
        height: 200,
        ...(open ? { left: 0, width: '100%', zIndex: 2, height: '100%' } : closedStyle),
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        cursor: open ? null : 'pointer',
        transition: 'all .2s',
        ...(open ? { transform: 'scale(1.02)', ...style.highlyShadowed } : {}),
        ':hover': { transform: 'scale(1.02)', ...style.highlyShadowed }
    }} onClick={() => { if(!open) { setOpen(true); setExpand(true); } } }>
        <div style={{width: open ? '33.33%' : '100%', height: '100%', transition: 'all .2s' }}>
            <div style={{
                backgroundImage: `url(${picture})`,
                marginTop: open ? 40 : 0,
                height: 160,
                backgroundSize: 'contain',
                backgroundRepeat:  'no-repeat',
                backgroundPosition:  'center',
                transition: 'all .2s',
            }}>
            </div>
            <div style={{
                ...style.serif,
                fontSize: '20px',
                padding: '5px 0',
                textAlign: 'center',
                opacity: open ? 0 : 1,
                transition: 'all .2s',
            }}>{name}</div>
        </div>
        { open ? <div style={{ width: '66.66%', overflow: 'auto' }}>
            <Article id={id} closeable={true} onClose={() => { setOpen(false); setExpand(false); }}></Article>
        </div> : null}
    </div>
});


export default Churches;