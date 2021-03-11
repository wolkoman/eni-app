import React from 'react';

export default function Responsive({children}: {children: any}){
  return <div className="md:max-w-3xl mx-auto">
    {children}
  </div>
}