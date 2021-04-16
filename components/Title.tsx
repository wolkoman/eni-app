import * as React from 'react';
import Responsive from './Responsive';

export default function Title() {
  return <>
    <div className="bg-white py-12 bg-gray-100">
      <Responsive>
        <div className="font-serif px-4 py-5">
          <div className="text-xl">Willkommen in den Pfarren</div>
          <div className="text-5xl font-bold">Inzersdorf und Wienerberg</div>
        </div>

        <div className="mt-12 mb-6 ml-8">
          <LineAnimation/>
        </div>

      </Responsive>
    </div>
    <div className="h-4 lg:h-10" style={{
      backgroundSize: '100% 100%',
      backgroundImage: `url(/curve.svg)`,
      backgroundRepeat: 'no-repeat'
    }}/>
  </>;
}

function LineAnimation(){
  return <div className="w-64 relative">
  <svg className="top-0 left-0" viewBox="0 0 162.8 32.2" style={{"enable-background":"new 0 0 162.8 32.2"} as any}>
    <style type="text/css">
      {".st1{fill:none;stroke:#555555;stroke-width:2.6626;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}"}
    </style>
    <path className="st1" d="M2.7,29.4h10.1c0,0-0.2-10.6,0-12.3c6.6-4.5,13.6-5.2,16.7-5.2c0.1-2.5,0.1-7.4,0.1-7.4h7.7l-0.1,9.1 c0,0,4.6,0.7,6.7,2.4v13.4h24.6l-0.2-13.8c-10.9-2.9,10.5-5.1,10.5-5.1V2.8h6.6v7.6c0,0,21.4,2.2,10.5,5.1v13.8h25.4v-1.6V9.1 l6.3-4.7l5.7,4.9v10.1H144l6.2,2v7.9h9.9"/>
  </svg>
  <svg className="absolute top-0 left-0" viewBox="0 0 162.8 32.2" style={{"enable-background":"new 0 0 162.8 32.2"} as any}>
    <style type="text/css">
      {".st0{fill:none;stroke:#000000;stroke-width:2.6626;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}"}
    </style>
    <path className="st0 line" d="M2.7,29.4h10.1c0,0-0.2-10.6,0-12.3c6.6-4.5,13.6-5.2,16.7-5.2c0.1-2.5,0.1-7.4,0.1-7.4h7.7l-0.1,9.1 c0,0,4.6,0.7,6.7,2.4v13.4h24.6l-0.2-13.8c-10.9-2.9,10.5-5.1,10.5-5.1V2.8h6.6v7.6c0,0,21.4,2.2,10.5,5.1v13.8h25.4v-1.6V9.1 l6.3-4.7l5.7,4.9v10.1H144l6.2,2v7.9h9.9"/>
  </svg></div>;
}