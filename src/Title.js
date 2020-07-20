import Radium from 'radium';
import React from 'react';
import { style } from './style';

const Title = Radium(() => {
    return <div style={{
        padding: '60px',
        fontSize: 70,
        fontWeight: 800,
        textAlign: 'center',
        ...style.serif,
        color: '#fff',
        ...style.shadowed,
        background: style.gradient,
        boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
        [style.mobile]: { fontSize: 60, padding: '60px 20px', },
    }}>
        Gott liebt dich!
    </div>
});

export default Title;