import React from 'react';
import Radium from 'radium';
import {style} from './style';
import { useRouteMatch, Link } from "react-router-dom";

function Navbar() {
  const match = useRouteMatch({path: '/', strict: true});
  const greyed = {
  }
  return (
    <Link to="/" className="Navbar" style={{
      ...style.serif,
      fontSize: 60,
      fontWeight: 'bold',
      textDecoration: 'none',
      paddingLeft: 20,
      color: style.dark,
      cursor: 'pointer',
      ...(match.isExact ? {} : {fontSize: 30, lineHeight: 1})
    }}>
      <span style={{ color: style.dark, ...(match.isExact ? {} : greyed)}}>eni</span>
      <span style={{ color: style.accent, ...(match.isExact ? {} : greyed)}}>.wien</span>
    </Link>
  );
}

export default Radium(Navbar);