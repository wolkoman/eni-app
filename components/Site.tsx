import Navbar from './Navbar';
import Responsive from './Responsive';
import React from 'react';

export default function Site({ children, responsive = true }:{ children: React.ReactNode, responsive?: boolean }){
  return <div className="min-h-screen">
    <Navbar/>
    {responsive ?  <Responsive>
      {children}
    </Responsive> : children}
  </div>;
}