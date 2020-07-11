import React from 'react';
import Radium from 'radium';
import { style } from './style';

const Church = ({ name , picture, first, link}) => {

    return <div style={{
        height: '100%',
        flexGrow: 1,
        marginLeft: first ? 0 : 10,
        ...style.shadowed,
        backgroundColor: style.white,
        cursor: 'pointer'
    }} onClick={() => window.location.href = link }>
        <div style={{
            backgroundImage: `url(${picture})`,
            height: 'calc(100% - 40px)',
            backgroundSize: 'contain',
            backgroundRepeat:  'no-repeat',
            backgroundPosition:  'center',
        }}>
        </div>
        <div style={{
            ...style.serif,
            fontSize: '20px',
            padding: '5px 0',
            textAlign: 'center',
        }}>{name}</div>
    </div>
}


export default Radium(Church);