import "../styles/globals.scss";
import * as React from 'react';

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

export default MyApp