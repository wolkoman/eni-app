const mixin = {
  sidepad: (pad: any) => ({
    paddingLeft: pad + "px",
    paddingRight: pad + "px",
  }),
};
let style = {
  minmedia: (x: number) => `@media screen and (min-width: ${x}px)`,
  maxmedia: (x: number) => `@media screen and (max-width: ${x - 1}px)`,
} as any;
style = {
  ...style,
  white: "#fff",
  light: "#f8f8f8",
  accent3: "#F5B428",
  accent1: "#31575E",
  accent2: "#11B0A8",
  dark: "#2B303A",
  borderRadius: 6,
  padding: 40,
  mobileBreak: 600,
  sans: { fontFamily: "Source Sans Pro" },
  serif: { fontFamily: "Source Serif Pro" },
  mobile: style.maxmedia(style.mobileBreak),
};
style.gradient = `linear-gradient(25deg,  ${style.accent1}, ${style.accent2}, ${style.accent3})`;
style.shadowed = {
  boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
  background: style.white,
  borderRadius: 6,
  overflow: "auto",
};
style.highlyShadowed = {
  boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
};
style.responsive = {
  [style.minmedia(style.mobileBreak)]: mixin.sidepad(80),
  [style.minmedia(1000)]: mixin.sidepad(120),
  [style.minmedia(1200)]: mixin.sidepad(200),
  [style.minmedia(1500)]: mixin.sidepad(300),
  [style.minmedia(1800)]: mixin.sidepad(500),
  [style.minmedia(2000)]: mixin.sidepad(600),
  [style.minmedia(2400)]: mixin.sidepad(800),
  [style.minmedia(2800)]: mixin.sidepad(1000),
  [style.minmedia(3500)]: mixin.sidepad(1500),
  mobile: style.maxmedia(style.mobileBreak),
};
style.mobile = style.maxmedia(style.mobileBreak);

export { mixin, style };
