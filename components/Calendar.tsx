import React from 'react';
import {CalendarEvent, CalendarGroups} from '../util/calendar';

export default function Calendar({calendarGroups}: { calendarGroups: CalendarGroups }) {
  return <div className="flex p-2">
    <div className="flex flex-col w-72 relative">
      <div className="sticky top-10">
      {[
        {name: 'Alle', image: './miniatures/all.svg', key: 'all'},
        {name: 'Emmaus', image: './miniatures/emmaus.svg', key: 'emmaus'},
        {name: 'St. Nikolaus', image: './miniatures/inzersdorf.svg', key: 'inzersdorf'},
        {name: 'Neustift', image: './miniatures/neustift.svg', key: 'neustift'},
      ].map(item => <div key={item.name} className="flex py-0.5">
        <img src={item.image} className="w-6 mr-2"/>
        <div className="font-semibold">{item.name}</div>
      </div>)}
      </div>
    </div>
    <div className="w-full">
      {Object.entries(calendarGroups).map(([day, events]) => <>
        <EventDate date={new Date(day)} key={day}/>
        {events
          .filter(event => event)
          .map(event => <Event key={event?.id} event={event}/>)}
        </>)}
    </div>
  </div>
}

const Event = ({event}: { event: any }) => {
  const date = new Date(event.start.date ?? event.start.dateTime);
  return <div className="py-1 font-semibold flex">
    <div className="w-18 mr-2 font-serif">
      {event.wholeday ? null :
        <div>{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</div>}
    </div>
    <Bubble calendar={event.calendar}/>
    <div className="flex flex-col font-serif">
      <div>{event.summary}</div>
      <div className="font-normal text-sm">{event.description}</div>
    </div>
  </div>;
}

export const EventDate = ({date}: { date: Date }) => {
  const day = date.getDay();
  return <div className={`pt-2 ${day ? '' : 'underline'}`}>
    {['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][day]},{' '}
    {date.getDate()}. {['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][date.getMonth()]}
  </div>;
}

const Bubble = ({calendar}: { calendar: string }) => {
  const calendarColors = {
    emmaus: 'bg-primary1-default',
    inzersdorf: 'bg-primary2-default',
    neustift: 'bg-primary3-default'
  };
  const calendarImages = {
    emmaus: './miniatures/emmaus.svg',
    inzersdorf: './miniatures/inzersdorf.svg',
    neustift: './miniatures/neustift.svg'
  };
  return <div className={(calendarColors as any)[calendar] + ' rounded-xl mt-1.5 mr-2 text-md w-3 h-3 flex-shrink-0'}>
    {/**<img src={(calendarImages as any)[calendar]} className="" style={{filter: 'brightness(10)'}}/>**/}
  </div>
}