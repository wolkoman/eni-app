import Radium from 'radium';
import React from 'react';
import { style } from './style';

const Title = Radium(() => {
    return <div style={{
        padding: '60px',
        fontSize: 80,
        fontWeight: 800,
        ...style.sans,
        color: '#fff',
        ...style.shadowed,
        background: 'linear-gradient(90deg, hsla(340, 80%, 69%, 1) 0%, hsla(15, 93%, 71%, 1) 100%)',
        boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
        [style.mobile]: { fontSize: 60, padding: '60px 20px', },
    }}>
        Gott liebt dich!
    </div>
});

export default Title;