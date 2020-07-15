import React from 'react';
import Radium from 'radium';
import { style } from './style';

const Churches = Radium(() => {
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '200px',
        columnGap: 20
    }}>
        <Church name="emmaus" picture="kirchen-01.svg" first={true} link="https://tesarekplatz.at"></Church>
        <Church name="neustift" picture="kirchen-03.svg" link="https://www.erzdioezese-wien.at/pages/pfarren/9233"></Church>
        <Church name="inzersdorf" picture="kirchen-02.svg" link="https://pfarresanktnikolaus.at"></Church>
  </div>;
});

const Church = Radium(({ name , picture, first, link}) => {

    return <div style={{
        ...style.shadowed,
        cursor: 'pointer',
        transition: 'all .1s',
        ':hover': { transform: 'scale(1.02)', ...style.highlyShadowed }
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