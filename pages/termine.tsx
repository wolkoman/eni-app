import Calendar from '../components/Calendar';
import React from 'react';
import {getPublicEvents} from '../util/calendar';
import {DatabaseService} from '../util/database';
import Site from '../components/Site';

export default function Events({calendarGroups}: any) {
  return <Site>
    <Calendar calendarGroups={calendarGroups}/>
  </Site>;
}


export async function getServerSideProps() {
  let publicEvents = await getPublicEvents();
  await DatabaseService.close();
  return {
    props: {
      calendarGroups: publicEvents
    }
  }
}