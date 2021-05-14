import React from 'react';

export default function Responsive({children}: {children: any}){
  return <div className="md:max-w-4xl mx-auto px-4">
    {children}
  </div>
}