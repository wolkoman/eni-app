import * as React from 'react';
import {CalendarEvents} from '../util/calendar';

export default function Calendar({ events }: {events: CalendarEvents}) {
  return <div className="flex py-2 px-4">
    <div className="flex flex-col w-72">
      {[
        {name: "Alle", image: "./miniatures/all.svg", key: "all"},
        {name: "Emmaus", image: "./miniatures/emmaus.svg", key: "emmaus"},
        {name: "St. Nikolaus", image: "./miniatures/inzersdorf.svg", key: "inzersdorf"},
        {name: "Neustift", image: "./miniatures/neustift.svg", key: "neustift"},
      ].map(item => <div key={item.name} className="flex py-0.5">
        <img src={item.image} className="w-6 mr-2"/>
        <div className="font-semibold">{item.name}</div>
      </div>)}
    </div>
    <div className="h-3xl overflow-y-scroll">
      { events.map((event) => <Event key={event?.id} event={event}/>) }
    </div>
  </div>
}

const Event = ({ event }: {event: any}) => {
  const date = new Date(event.start.date ?? event.start.dateTime);
  return <div className="pb-2">
    <div className="flex">
      <EventDate date={date}/>
    </div>
    <div className="font-semibold flex">
      <Bubble calendar={event.calendar}/>
      <div className="w-18 mr-2">
        { event.wholeday ? null : <div>{date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')}</div>}
      </div>
      <div className="flex flex-col">
        <div>{event.summary}</div>
        <div className="font-normal text-sm">{event.description}</div>
      </div>
    </div>
  </div>;
}

const EventDate = ({ date }: {date: Date}) => {
  return <div>
    {["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][date.getDay()]},{" "}
    {date.getDate()}. {["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"][date.getMonth()]}
  </div>;
}

const Bubble = ({ calendar, children }: {calendar: string, children?: any}) => {
  const calendarColors = {emmaus: 'bg-primary1-default', inzersdorf: 'bg-primary3-default', neustift: 'bg-primary2-default'};
  const calendarImages = {emmaus: './miniatures/emmaus.svg', inzersdorf: './miniatures/inzersdorf.svg', neustift: './miniatures/neustift.svg'};
  return <div className={(calendarColors as any)[calendar] + " rounded-xl mt-0.5 mr-2 text-md w-5 h-5 flex-shrink-0"}>
    <img src={(calendarImages as any)[calendar]} className="" style={{filter: 'brightness(10)'}}/>
  </div>
}