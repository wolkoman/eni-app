const minmedia = (x) => `@media(min-width: ${x}px)`;
const mixin = {
    sidepad: (pad) => ({paddingLeft: pad + 'px', paddingRight: pad + 'px'}),
}
const style = {
    white: '#fff',
    light: '#eee',
    accent: '#58A4B0',
    dark: '#2B303A',
    borderRadius: '0px',
    mobileBreak: 600,
    shadowed: { boxShadow: '0px 5px 10px rgba(0,0,0,0.2)' },
    sans: { fontFamily: 'Source Sans Pro' },
    serif: { fontFamily: 'Source Serif Pro' },
}
style.responsive = {
    [minmedia(style.mobileBreak)] : mixin.sidepad(100),
    [minmedia(1000)] : mixin.sidepad(150),
    [minmedia(1200)] : mixin.sidepad(300),
    [minmedia(1500)] : mixin.sidepad(400),
    [minmedia(1800)] : mixin.sidepad(500),
};

export { mixin , style }