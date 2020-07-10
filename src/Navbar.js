import React from 'react';
import Radium from 'radium';
import {style} from './style';

function Navbar() {
  return (
    <div className="Navbar" style={{
      ...style.serif,
      fontSize: '80px',
      fontWeight: 'bold',
      color: style.dark,
      paddingTop: '20px'
    }}>
      <span style={{ color: style.dark,}}>eni</span>
      <span style={{ color: style.accent,}}>.wien</span>
    </div>
  );
}

export default Radium(Navbar);