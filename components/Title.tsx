import * as React from 'react';
import Responsive from './Responsive';

export default function Title() {
  return <>
    <div className="bg-white py-12 bg-gray-100">
      <Responsive>
        <div className="font-serif px-4 py-5">
          <div className="text-xl font-semibold">Willkommen in den Pfarren</div>
          <div className="text-5xl font-bold">Inzersdorf und Wienerberg</div>
        </div>
        <img src="/line.svg" className="w-64 mt-12 ml-8" />
      </Responsive>
    </div>
    <div style={{backgroundSize: "100% 50px", height: 50, backgroundImage: `url(/curve.svg)`, backgroundRepeat: "no-repeat"}}/>
  </>;
}