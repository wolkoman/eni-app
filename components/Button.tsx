import React from 'react';

export default function Button({label}: {label: string}) {
  return <div className="bg-gray-200 hover:bg-gray-300 rounded font-sans inline-block px-3 py-1 mt-4 cursor-pointer">
    {label}
  </div>;
}
