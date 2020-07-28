import React from 'react';
import Radium from 'radium';
import { style } from './style';
import { useRouteMatch, Link } from "react-router-dom";

const Navbar = Radium(() => {
  const match = useRouteMatch({path: '/', strict: true});
  return (
    <div style={{ paddingBottom: 20 }}>
      <Link to="/" className="Navbar" style={{
        display: 'flex',
        ...style.serif,
        fontWeight: 'bold',
        textDecoration: 'none',
        paddingLeft: 20,
        color: style.dark,
        cursor: 'pointer',
        ...(match.isExact ? { fontSize: 45 } : { fontSize: 30 }),
        transition: 'all .1s',
      }}>
        <img src="/logo.svg" alt="eni logo" style={{ paddingRight: 10, width: match.isExact ? 40 : 30, transition: 'all .2s' }}/>
        <span>eni</span>
        <span style={{ opacity: 0.5 }}>.wien</span>
      </Link>
    </div>
  );
});

export default Navbar;