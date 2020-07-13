import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';

const Footer = Radium(() => {
    return <div style={{textAlign: 'center', marginTop: '60px'}}>
        {[
            <FooterItem link="/impressum" title="Impressum"></FooterItem>,
            <FooterItem link="//github.com/wolkoman/eni-app" title="Quellcode" hard={true}></FooterItem>,
            <FooterItem title="Feedback" hard={true} onClick={() => window.open("//docs.google.com/forms/d/e/1FAIpQLSfcVTLOylH9uUk50iKZvXe6WiDRY-JXV5HnfhYIPR1XOFmJPA/viewform?usp=sf_link")}></FooterItem>,
        ].map((item,index) => [index === 0 ? null : <FooterSeperator></FooterSeperator> ,item]).flat()}
    </div>
});

const FooterItem = Radium(({link, title, hard = false, onClick}) => {
    return hard
    ? <a href={link} onClick={onClick} style={{color: 'grey', textDecoration: 'none', cursor: 'pointer'}}>{title}</a>
    : <Link to={link} style={{color: 'grey', textDecoration: 'none'}}>{title}</Link>
    ;
});
const FooterSeperator = Radium(() => {
    return <span style={{display: 'inline-block', margin: '0 10px', color: 'grey'}}>-</span>
});

export default Footer;