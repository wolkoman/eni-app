import React from 'react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import Responsive from '../components/Responsive';
import {getPublicEvents} from '../util/calendar';
import Title from '../components/Title';

export default function HomePage({  calendar }: {calendar: any}) {
  return <div className="bg-gray-100 min-h-screen">
    <Navbar />
    <Title/>
    <Responsive>
      <Calendar calendar={calendar} />
    </Responsive>
  </div>
}

export async function getServerSideProps() {
  return {
    props: {
      calendar: (await getPublicEvents()).reduce((previous, current) => {
        previous[current!.date] = previous[current!.date] ?? [];
        previous[current!.date].push(current);
        return previous;
      }, {} as any)
    }
  }
}