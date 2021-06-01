import Navbar from './Navbar';
import Responsive from './Responsive';
import React from 'react';
import Footer from './Footer';

export default function Site({ children, responsive = true, narrow = false, navbar = true, footer = true }:{ children: React.ReactNode, responsive?: boolean , narrow?: boolean, navbar?: boolean, footer?: boolean}){
  return <div className="min-h-screen">
    {navbar ? <Navbar/> : null }
    {responsive ?  <Responsive narrow={narrow}>
      {children}
    </Responsive> : children}
    {navbar ? <Footer /> : null }
  </div>;
}