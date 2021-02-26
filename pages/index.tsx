import * as React from 'react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import Responsive from '../components/Responsive';
import {CalendarEvents, getPublicEvents} from '../util/calendar';

export default function HomePage({ events }: {events: CalendarEvents}) {
  return <div className="bg-gray-100 min-h-screen">
    <Navbar />
    <Responsive>
      <Calendar events={events} />
    </Responsive>
  </div>
}

export async function getServerSideProps() {
  return {
    props: {
      events: await getPublicEvents()
    }
  }
}