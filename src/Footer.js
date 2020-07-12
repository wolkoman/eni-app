import React from 'react';
import Radium from 'radium';

const Footer = Radium(() => {
    return <div style={{textAlign: 'center', marginTop: '60px'}}>
        {[
            <FooterItem link="" title="Test"></FooterItem>,
            <FooterItem link="" title="Test"></FooterItem>,
        ].map((item,index) => [index === 0 ? null : <FooterSeperator></FooterSeperator> ,item]).flat()}
    </div>
});

const FooterItem = Radium(({link, title}) => {
    return <a href={link} style={{color: 'grey', textDecoration: 'none'}}>{title}</a>
});
const FooterSeperator = Radium(({link, title}) => {
    return <span style={{display: 'inline-block', margin: '0 10px', color: 'grey'}}>-</span>
});

export default Footer;