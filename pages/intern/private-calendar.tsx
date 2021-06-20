import React, {useEffect, useState} from 'react';
import {Permission, useStore} from '../../util/store';
import Site from '../../components/Site';
import {Calendar} from '../../components/Calendar';

export default function InternArticles() {
  const [isLoggedIn, user, permissions, load] = useStore(state => [state.isLoggedIn(), state.user, state.permissions, state.load]);
  const [calendar, setCalendar] = useState<any>();

  useEffect(() => {
    load();
    fetch(`/api/google/private-calendar?token=${user?.api_key}`).then(response => response.json()).then(setCalendar);
  }, []);

  return isLoggedIn && permissions[Permission.PrivateCalendarAccess] && calendar !== undefined && <Site>
    <Calendar calendarGroups={calendar}/>
  </Site>
}
