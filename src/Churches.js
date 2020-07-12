import React from 'react';
import Radium from 'radium';
import { style } from './style';

const Churches = Radium(() => {
    return <div style={{display: 'flex', height: 200 + 'px'}}>
        <Church name="emmaus" picture="kirchen-01.svg" first={true} link="https://tesarekplatz.at"></Church>
        <Church name="neustift" picture="kirchen-03.svg" link="https://pfarresanktnikolaus.at"></Church>
        <Church name="inzersdorf" picture="kirchen-02.svg" link="http://www.pfarreinzersdorfneustift.at/"></Church>
  </div>;
});

const Church = Radium(({ name , picture, first, link}) => {

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
});


export default Churches;