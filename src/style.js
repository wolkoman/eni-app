const mixin = {
    sidepad: (pad) => ({paddingLeft: pad + 'px', paddingRight: pad + 'px'}),
}
let style = {
    minmedia: (x) => `@media screen and (min-width: ${x}px)`,
    maxmedia: (x) => `@media screen and (max-width: ${x-1}px)`,
};
style = {
    ...style,
    white: '#fff',
    light: '#f8f8f8',
    accent3: '#F5B428',
    accent1: '#31575E',
    accent2: '#11B0A8',
    dark: '#2B303A',
    borderRadius: '0px',
    mobileBreak: 600,
    sans: { fontFamily: 'Source Sans Pro' },
    serif: { fontFamily: 'Source Serif Pro' },
    mobile: style.maxmedia(style.mobileBreak),
}
style.gradient = `linear-gradient(25deg,  ${style.accent1}, ${style.accent2}, ${style.accent3})`;
style.shadowed =  {
    boxShadow: '0px 3px 5px rgba(0,0,0,0.1)',
    background: style.white,
    borderRadius: 6,
};
style.highlyShadowed =  {
    boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
};
style.responsive = {
    [style.minmedia(style.mobileBreak)] : mixin.sidepad(80),
    [style.minmedia(1000)] : mixin.sidepad(120),
    [style.minmedia(1200)] : mixin.sidepad(200),
    [style.minmedia(1500)] : mixin.sidepad(300),
    [style.minmedia(1800)] : mixin.sidepad(500),
    mobile: style.maxmedia(style.mobileBreak),
};
style.mobile = style.maxmedia(style.mobileBreak);

export { mixin , style }