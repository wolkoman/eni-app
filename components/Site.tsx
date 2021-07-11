import Navbar from './Navbar';
import Responsive from './Responsive';
import React from 'react';
import Footer from './Footer';

export default function Site({ children, responsive = true, narrow = false, navbar = true, footer = true, title }:{title?: string, children: React.ReactNode, responsive?: boolean , narrow?: boolean, navbar?: boolean, footer?: boolean}){
  return <>
    <head>
      <title>eni.wien</title>
      <script type="text/javascript" src="https://app.mailjet.com/statics/js/widget.modal.js"/>
    </head>
    <div className="min-h-screen">
    {navbar ? <Navbar/> : null }
    {responsive ?  <Responsive narrow={narrow}>
      {title ? <div className="font-bold text-2xl my-4">{title}</div> : null}
      {children}
    </Responsive>: children}
    {navbar ? <Footer /> : null }
  </div></>;
}