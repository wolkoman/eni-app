import React from 'react';
import {StyleRoot} from 'radium';
import {style} from './style';
import Navbar from './Navbar';
import Church from './Church';
import Box from './Box';
import Events from './Events';

function App() {
  return (
  <StyleRoot>
      <div style={{...style.responsive, background: style.light, minHeight: '100vh', paddingBottom: 100}}>
        <Navbar></Navbar>
        <Box label="Pfarren">
          <div style={{display: 'flex', height: 200 + 'px'}}>
            <Church name="emmaus" picture="kirchen-01.svg" first={true} link="https://tesarekplatz.at"></Church>
            <Church name="neustift" picture="kirchen-03.svg" link="https://pfarresanktnikolaus.at"></Church>
            <Church name="inzersdorf" picture="kirchen-02.svg" link="http://www.pfarreinzersdorfneustift.at/"></Church>
          </div>
        </Box>
        <Box label="Termine">
          <Events></Events>
        </Box>
      </div>
    </StyleRoot>
    );
}

export default App;
