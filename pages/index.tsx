import React, {useState} from 'react';
import {EventDate} from '../components/Calendar';
import Responsive from '../components/Responsive';
import {CalendarEvent, CalendarGroups, getPublicEvents} from '../util/calendar';
import {DatabaseService} from '../util/database';
import Articles from '../components/Articles';
import Site from '../components/Site';
import {Cockpit, CockpitArticles} from '../util/cockpit';
import Button from '../components/Button';

export default function HomePage(props: { calendarGroups: CalendarGroups, articles: CockpitArticles }) {
  return <Site>
      <Articles articles={props.articles}/>
      <Parishes/>
      <Calendar calendarGroups={props.calendarGroups}/>
      <div className="flex flex-col md:flex-row my-14">
        <Info title="Newsletter" image="./info-01.svg">
          In unserem monatlichen Newsletter informieren wir kurz und prägnant über zukünftige, aktuelle und vergangene
          Geschehnisse in unseren drei Pfarren.
          <data id="mj-w-res-data" data-token="8f1b2140d89962bbed083c4c06b6edd4" className="mj-w-data"
                data-apikey="6LsO" data-w-id="J4h" data-lang="de_DE" data-base="https://app.mailjet.com"
                data-width="640" data-height="328" data-statics="statics"/>
          <div className="mj-w-button mj-w-btn" data-token="8f1b2140d89962bbed083c4c06b6edd4">
            <Button label="Newsletter abonnieren"/>
          </div>
          <script type="text/javascript" src="https://app.mailjet.com/statics/js/widget.modal.js"/>
        </Info>
        <Info title="Pfarrzeitung" image="./info-02.svg">
          Ausführliche Berichte zum Pfarrleben, Diskussionen zur Weltkirche, Impulse zum Nachdenken und vieles mehr
          finden Sie in den Pfarrzeitungen der Pfarren.
          <Button label="Pfarrzeitungen ansehen"/>
        </Info>
      </div>
  </Site>
}

function Calendar(props: { calendarGroups: CalendarGroups }) {
  const [filter, setFilter] = useState<string|null>(null);
  const bgColor = (calendar: string) => ({
    'emmaus': 'bg-primary1',
    'inzersdorf': 'bg-primary2',
    'neustift': 'bg-primary3'
  } as any)[calendar];
  return <div className="flex flex-col md:flex-row bg-gray-100">
    <div className="flex md:flex-col flex-row p-6 text-lg md:w-52 justify-around md:justify-start flex-shrink-0">
      {[
        {label: "Alle", action: () => setFilter(null)},
        {label: "Emmaus", action: () => setFilter("emmaus")},
        {label: "St. Nikolaus", action: () => setFilter("inzersdorf")},
        {label: "Neustift", action: () => setFilter("neustift")},
      ].map(parish => <div className="px-3 py-1 hover:bg-gray-200 mb-1 cursor-pointer" key={parish.label} onClick={parish.action}>{parish.label}</div>)}
    </div>
    <div className="h-3xl overflow-y-auto flex-grow events py-4">
      {Object.entries(props.calendarGroups)
        .map(([date, events]) => [date, events.filter(event => event.calendar === filter || filter === null)] as [string, CalendarEvent[]])
        .filter(([date, events]) => events.length > 0)
        .map(([date, events]) => <div key={date}>
        <div className="mt-3 leading-5"><EventDate date={new Date(date)}/></div>
        {events.map(event => <div className="flex text-lg font-semibold" key={event.id}>
          <div className="w-10">{event.start.dateTime?.substring(11, 16)}</div>
          <div>
            <div className={`${bgColor(event.calendar)} w-3 h-3 mx-3 rounded-xl mt-2`}/>
          </div>
          <div className="mb-2">
            <div>{event.summary}</div>
            {event.calendar !== "all" && filter === null ? <div className="font-normal text-sm leading-4 italic">in {({
              emmaus: 'Emmaus',
              inzersdorf: 'St. Nikolaus',
              neustift: 'Neustift'
            } as any)[event.calendar]}</div> : null}
            <div className="font-normal text-sm leading-4">{event.description}</div>
          </div>
        </div>)}
      </div>)}
    </div>
  </div>;
}

function Parishes() {
  return <div className="grid grid-cols-3 gap-4 md:gap-16 py-12">
    {[
      {
        image: '/emmaus.png',
        name: 'Pfarre Emmaus am Wienerberg',
        description: (x: string) => <>Die <b>{x}</b> wurde aus den Überresten der ehemaligen Wienerberger Ziegelfabrik
          errichtet.</>
      },
      {
        image: '/inzersdorf.png',
        name: 'Pfarre Inzersdorf - St. Nikolaus',
        description: (x: string) => <>Die <b>{x}</b> ist mit dem Gründungsjahr 1217 eine der ältesten Kirchen im Raum
          Wien.</>
      },
      {
        image: '/neustift.png',
        name: 'Pfarre Inzersdorf - Neustift',
        description: (x: string) => <>Die <b>{x}</b> entstand aus einer Abspaltung aus der Pfarre Inzersdorf und wurde
          Maria, Hilfe der Christen geweiht.</>
      },
    ].map(parish => <div key={parish.name}>
      <img src={parish.image} className="pb-2" alt={parish.name}/>
      <div className="md:hidden font-bold">{parish.name}</div>
      <div className="hidden md:block">{parish.description(parish.name)}</div>
    </div>)}
  </div>;
}

const Info = ({title, image, children}: { title: string, image: string, children: any }) => {
  return <div className="px-3 text-lg">
    <div className="flex flex-row items-end mb-2">
      <img src={image} className="w-16"/>
      <div className="text-3xl ml-2 font-bold">{title}</div>
    </div>
    {children}
  </div>
}

const CalenderPeek = ({
                        calendarGroups,
                        calendar,
                        label
                      }: { calendarGroups: CalendarGroups, calendar: string, label: string }) => {
  const borderColor = ({
    'emmaus': 'border-primary1',
    'inzersdorf': 'border-primary2',
    'neustift': 'border-primary3'
  } as any)[calendar];
  const textColor = ({
    'emmaus': 'text-primary1',
    'inzersdorf': 'text-primary2',
    'neustift': 'text-primary3'
  } as any)[calendar];
  return <div className={`rounded border-l-4 ${borderColor} p-2 overflow-hidden border ${borderColor}`}>
    <div className={`${textColor} font-bold uppercase`}>Pfarre {label}</div>
    {Object.entries(calendarGroups)
      .map(([date, events]) => ([date, events.filter(event => event.calendar === calendar)] as [string, CalendarEvent[]]))
      .filter(([_, events]) => events.length > 0)
      .slice(0, 1)
      .map(([date, events]) =>
        <div key={date} className="flex flex-col py-4 px-2">
          <div className="underline mb-2"><EventDate date={new Date(date)}/></div>
          <div className="text-lg">{events.map(event =>
            <div className="">
              <div className="inline mr-2">{new Date(event.start.dateTime).toLocaleTimeString().slice(0, 5)}</div>
              <div className="inline leading-6">{event.summary}</div>
            </div>)}
          </div>
        </div>)
    }
  </div>;
};


export async function getServerSideProps() {
  let publicEvents = await getPublicEvents();
  await DatabaseService.close();
  return {
    props: {
      calendarGroups: publicEvents,
      articles: await Cockpit.article({'platform': 'eni'}, {'_o': '1'})
    }
  }
}