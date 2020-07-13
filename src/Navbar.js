import React from 'react';
import Radium from 'radium';
import { style } from './style';
import { useRouteMatch, Link } from "react-router-dom";

function Navbar() {
  const match = useRouteMatch({path: '/', strict: true});
  return (
    <div style={{ paddingBottom: 20 }}>
      <Link to="/" className="Navbar" style={{
        ...style.serif,
        fontSize: 60,
        fontWeight: 'bold',
        textDecoration: 'none',
        paddingLeft: 20,
        color: style.dark,
        cursor: 'pointer',
        ...(match.isExact ? {} : { fontSize: 30 }),
        transition: 'all .1s',
      }}>
        <span style={{}}>eni</span>
        <span style={{ opacity: 0.5 }}>.wien</span>
      </Link>
    </div>
  );
}

export default Radium(Navbar);