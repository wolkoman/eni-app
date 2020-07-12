import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';

const Footer = Radium(() => {
    return <div style={{textAlign: 'center', marginTop: '60px'}}>
        {[
            <FooterItem link="/impressum" title="Impressum"></FooterItem>,
        ].map((item,index) => [index === 0 ? null : <FooterSeperator></FooterSeperator> ,item]).flat()}
    </div>
});

const FooterItem = Radium(({link, title}) => {
    return <Link to={link} style={{color: 'grey', textDecoration: 'none'}}>{title}</Link>
});
const FooterSeperator = Radium(({link, title}) => {
    return <span style={{display: 'inline-block', margin: '0 10px', color: 'grey'}}>-</span>
});

export default Footer;