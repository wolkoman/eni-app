import React, {useEffect, useState} from 'react';
import {Permission, useUserStore} from '../../util/store';
import Site from '../../components/Site';
import {CalendarEvent} from '../../util/calendarEvents';

export default function InternArticles() {
  const [isLoggedIn, user, permissions, load] = useUserStore(state => [state.user?.active, state.user, state.permissions, state.load]);
  const [calendar, setCalendar] = useState<any>();

  useEffect(() => {
    load();
    fetch(`/api/google/private-calendar?token=${user?.api_key}`).then(response => response.json()).then(setCalendar);
  }, []);

  return isLoggedIn && permissions[Permission.ReaderPlanning] && <Site>
    {Object.entries(calendar ?? {}).flatMap(([_, events]) => events as CalendarEvent[])
      .filter(event => event.summary.match(/messe|dienst|andacht|prozession/i))
      .map(event => <div>{event.date} {event?.summary} {event.calendar}</div>)}
  </Site>
}
