import React, {useEffect} from 'react';
import {CalendarGroups} from '../util/calendar';
import Site from '../components/Site';
import {CockpitArticles} from '../util/cockpit';
import {Permission, useStore} from '../util/store';

export default function HomePage({calendarGroups, articles}: { calendarGroups: CalendarGroups, articles: CockpitArticles }) {
  const [isLoggedIn, permissions, load] = useStore(state => [state.isLoggedIn(), state.permissions, state.load]);
  useEffect(() => load(), []);
  return !isLoggedIn ? null : <Site>
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {permissions[Permission.Articles] ? <div className="h-32 bg-gray-200"></div> : null}
    </div>
  </Site>
}