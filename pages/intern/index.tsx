import React from 'react';
import Link from 'next/link';
import {Permission, useUserStore} from '../../util/store';
import Site from '../../components/Site';
import {usePermission} from '../../util/usePermission';

export default function Intern() {
  const [permissions, user] = useUserStore(state => [state.permissions, state.user]);
  usePermission([]);
  return <Site>
    {JSON.stringify({permissions, user})}
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {
        permissions[Permission.Articles] &&
        <Link href="intern/artikel"><div className="h-32 bg-gray-200 flex justify-center items-center text-lg cursor-pointer">Artikel</div></Link>
      }
      {
        permissions[Permission.ReaderPlanning] &&
        <Link href="intern/reader-planning"><div className="h-32 bg-gray-200 flex justify-center items-center text-lg cursor-pointer">Lektor:innen Einteilung</div></Link>
      }
      {
        permissions[Permission.PrivateCalendarAccess] &&
        <Link href="intern/private-calendar"><div className="h-32 bg-gray-200 flex justify-center items-center text-lg cursor-pointer">Privater Kalendar</div></Link>
      }
    </div>
  </Site>
}