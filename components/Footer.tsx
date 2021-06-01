import Link from 'next/link';
import React from 'react';
import Responsive from './Responsive';

export default function Footer(props: {}) {
  return <>
    <div className="bg-gray-200 py-6 text-gray-600 mt-12">
      <Responsive>
        <div className="flex justify-between">
          <div>Pfarre Emmaus am Wienerberg, Inzersdorf (St. Nikolaus), Inzersdorf-Neustift</div>
          <Link href="login"><div className="cursor-pointer underline hover:no-underline">Login</div></Link>
        </div>
      </Responsive>
    </div>
  </>;
}
