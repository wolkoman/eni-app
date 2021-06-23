import React, {useEffect, useState} from 'react';
import {Permission, useUserStore} from '../../util/store';
import Site from '../../components/Site';
import {Calendar} from '../../components/Calendar';
import {usePermission} from '../../util/usePermission';

export default function InternArticles() {
  const [isLoggedIn, user, permissions, load] = useUserStore(state => [state.user?.active, state.user, state.permissions, state.load]);
  const [calendar, setCalendar] = useState<any>();
  usePermission([Permission.PrivateCalendarAccess]);

  return <Site>
    <Calendar/>
  </Site>
}
