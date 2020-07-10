import React from 'react';
import Radium from 'radium';
import { style } from './style';

const Church = ({ name , picture}) => {

    return <div style={{
        height: '100%',
        flexGrow: 1,
    }}>
        <div style={{
            backgroundImage: `url(${picture})`,
            height: 'calc(100% - 30px)',
            backgroundSize: 'contain',
            backgroundRepeat:  'no-repeat',
            backgroundPosition:  'center',
        }}>
        </div>
        <div style={{
            ...style.serif,
            fontSize: '20px',
            paddingTop: '5px',
            textAlign: 'center',
        }}>{name}</div>
    </div>
}


export default Radium(Church);