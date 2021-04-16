import React from 'react';
import Navbar from '../components/Navbar';
import Calendar, {EventDate} from '../components/Calendar';
import Responsive from '../components/Responsive';
import {CalendarEvent, CalendarGroups, getPublicEvents} from '../util/calendar';
import Title from '../components/Title';
import { DatabaseService } from '../util/database';
import Article from '../components/Article';

export default function HomePage({ calendarGroups }: {calendarGroups: CalendarGroups}) {
  return <div className="min-h-screen">
    <Navbar/>
    <Title/>
    <Responsive>
      <Article/>
      <div className="lg:-mx-12 my-4 grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4 md:h-40">
        <CalenderPeek calendarGroups={calendarGroups} calendar="emmaus" />
        <CalenderPeek calendarGroups={calendarGroups} calendar="inzersdorf" />
        <CalenderPeek calendarGroups={calendarGroups} calendar="neustift" />
      </div>
      <div className="flex flex-row my-14">
        <Info title="Newsletter" image="./info-01.svg">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
        </Info>
        <Info title="Pfarrzeitung" image="./info-02.svg">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
        </Info>
      </div>
      <Calendar calendarGroups={calendarGroups}/>
    </Responsive>
  </div>
}

const Info = ({title, image, children}: {title: string, image: string, children: string}) => {
  return <div className="font-serif px-3 text-lg">
    <div className="flex flex-row items-end mb-2">
      <img src={image} className="w-16"/>
      <div className="text-3xl ml-2">{title}</div>
    </div>
    {children}
  </div>
}

const CalenderPeek = ({calendarGroups, calendar}:{calendarGroups: CalendarGroups, calendar: string}) => {
  const color = ["emmaus", "inzersdorf", "neustift"].indexOf(calendar)+1;
  return <div className={`rounded bg-gray-100 border-l-4 border-primary${color}-default p-2 overflow-hidden`}>
    <div className={`text-primary${color}-default font-bold uppercase`}>{calendar}</div>
    {Object.entries(calendarGroups)
      .map(([date, events]) => ([date, events.filter(event => event.calendar === calendar)] as [string, CalendarEvent[]]))
      .filter(([_, events]) => events.length > 0)
      .map(([date, events]) => <div key={date}>
        <div><EventDate date={new Date(date)}/></div>
        <div className="text-lg">{events.map(event => <div className="flex">
          <div className="w-12 flex-shrink-0">{new Date(event.start.dateTime).toLocaleTimeString().slice(0,5)}</div>
          <div className="leading-6 mt-0.5">{event.summary}</div>
        </div>)}</div>
      </div>)
    }
  </div>;
};


export async function getServerSideProps() {
  let publicEvents = await getPublicEvents();
  await DatabaseService.close();
  return {
    props: {
      calendarGroups: publicEvents
    }
  }
}