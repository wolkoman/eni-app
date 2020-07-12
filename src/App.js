import React from 'react';
import {StyleRoot} from 'radium';
import {style} from './style';
import Navbar from './Navbar';
import Churches from './Churches';
import Box from './Box';
import Events from './Events';
import Footer from './Footer';

function App() {
  return (
  <StyleRoot>
      <div style={{...style.responsive, background: style.light, minHeight: '100vh', paddingBottom: 100}}>
        <Navbar></Navbar>
        <Box label="Pfarren">
          <Churches></Churches>
        </Box>
        <Box label="Termine">
          <Events></Events>
        </Box>
        <Footer></Footer>
      </div>
    </StyleRoot>
    );
}

export default App;
