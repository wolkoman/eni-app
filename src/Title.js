import Radium from 'radium';
import React from 'react';
import { style } from './style';

const Title = Radium(() => {
    return <div style={{
        padding: 80,
        ...style.serif,
        ...style.shadowed,
        textAlign: 'center',
        color: style.white,
        background: style.gradient,
        boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
        [style.mobile]: { padding: '60px 20px', },
    }}>
        <div style={{
            color: style.white,
            fontWeight: 800,
            fontSize: 70,
            [style.mobile]: {
                fontSize: 50,
            },
        }}>
            Gott liebt dich!
        </div>
        <div style={{
            ...style.sans,
            fontWeight: 300,
            fontSize: 15,
        }}>
            Bei ihm findest du Geborgenheit und Zuversicht
        </div>
    </div>
});

export default Title;