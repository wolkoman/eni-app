import * as React from 'react';
import Responsive from './Responsive';

export default function Title (){
  return <div className="bg-white py-12">
    <Responsive>
      <div className="text-4xl font-bold font-serif">
        <div>emmaus</div>
        <div>st. nikolaus</div>
        <div>inzersdorf-neustift</div>
      </div>
    </Responsive>
  </div>;
}