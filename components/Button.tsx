import React from 'react';

export default function Button(props: {label: string, onClick?: () => any}) {
  return <div className="bg-primary1 hover:bg-gray-700 rounded font-sans inline-block px-3 py-1 cursor-pointer text-white" onClick={props.onClick}>
    {props.label}
  </div>;
}
