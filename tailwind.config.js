module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Source Sans Pro'],
        'serif': ['Source Serif Pro'],
      },
      colors: {
        gray: {
          100: "#f8f8f8",
        },
        secondary: { default: "#cd309a" },
        primary1: { default: "#31575E" },
        primary2: { default: "#0E8F89" },
        primary3: { default: "#F4AC11" },
      },
      height: {
        xl: "200px",
        "2xl": "400px",
        "3xl": "500px",
      },},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
