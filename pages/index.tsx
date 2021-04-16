import React from 'react';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import Responsive from '../components/Responsive';
import {getPublicEvents} from '../util/calendar';
import Title from '../components/Title';
import { DatabaseService } from '../util/database';
import Article from '../components/Article';

export default function HomePage({ calendar }: {calendar: any}) {
  return <div className="min-h-screen">
    <Navbar />
    <Title/>
    <Responsive>
      <Article/>
      <div className="-mx-12 my-4 grid grid-cols-3 gap-4 h-40">
        <div className="rounded bg-gray-100 border-l-4 border-primary1-default"></div>
        <div className="rounded bg-gray-100 border-l-4 border-primary2-default"></div>
        <div className="rounded bg-gray-100 border-l-4 border-primary3-default"></div>
      </div>
      <Calendar calendar={calendar} />
    </Responsive>
  </div>
}

export async function getServerSideProps() {
  let publicEvents = await getPublicEvents();
  await DatabaseService.close();
  return {
    props: {
      calendar: publicEvents
    }
  }
}