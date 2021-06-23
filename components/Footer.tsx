import Link from 'next/link';
import React, {useEffect} from 'react';
import Responsive from './Responsive';
import {useUserStore} from '../util/store';

export default function Footer(props: {}) {
  const [isLoggedIn, load] = useUserStore(state => [state.user?.active, state.load]);
  useEffect(() => load(), []);
  return <>
    <div className="py-6 text-gray-600 mt-24">
      <Responsive>
        <div className="flex justify-between">
          <div>Pfarre Emmaus am Wienerberg, Inzersdorf (St. Nikolaus), Inzersdorf-Neustift</div>
          {isLoggedIn
            ? <>
            <Link href="/intern"><div className="cursor-pointer underline hover:no-underline">Zum Mitgliedsbereich</div></Link>
            </>
            : <Link href="/login"><div className="cursor-pointer underline hover:no-underline">Login</div></Link>}
        </div>
      </Responsive>
    </div>
  </>;
}
