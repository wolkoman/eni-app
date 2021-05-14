import React from 'react';
import {EventDate} from '../components/Calendar';
import Responsive from '../components/Responsive';
import {CalendarEvent, CalendarGroups, getPublicEvents} from '../util/calendar';
import {DatabaseService} from '../util/database';
import Articles from '../components/Articles';
import Site from '../components/Site';
import {Cockpit, CockpitArticles} from '../util/cockpit';

export default function HomePage({calendarGroups, articles}: { calendarGroups: CalendarGroups, articles: CockpitArticles }) {
  return <Site responsive={false}>
    <Responsive>
      <Articles articles={articles}/>
      <div className="grid grid-cols-3 gap-4 md:gap-16 py-12">
        <div>
          <img src="/emmaus.png" className="pb-2"/>
          <div>Die <b>Pfarre Emmaus am Wienerberg</b> wurde aus den Überresten der ehemaligen Wienerberger Ziegelfabrik errichtet.</div>
        </div>
        <div>
          <img src="/inzersdorf.png" className="pb-2"/>
          <div>Die <b>Pfarre Inzersdorf - St. Nikolaus</b> ist mit dem Gründungsjahr 1217 eine der ältesten Kirchen im Raum Wien.</div>
        </div>
        <div>
          <img src="/neustift.png" className="pb-2"/>
          <div>Die <b>Pfarre Inzersdorf-Neustift</b> entstand aus einer Abspaltung aus der Pfarre Inzersdorf und wurde Maria, Hilfe der Christen geweiht.</div>
        </div>
      </div>
      <div className="lg:-mx-12 my-8 grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4">
        <CalenderPeek calendarGroups={calendarGroups} calendar="emmaus" label="Emmaus"/>
        <CalenderPeek calendarGroups={calendarGroups} calendar="inzersdorf" label="St. Nikolaus"/>
        <CalenderPeek calendarGroups={calendarGroups} calendar="neustift" label="Neustift"/>
      </div>
      <div className="flex flex-col md:flex-row my-14">
        <Info title="Newsletter" image="./info-01.svg">
          In unserem monatlichen Newsletter informieren wir kurz und prägnant über zukünftige, aktuelle und vergangene Geschehnisse in unseren drei Pfarren.
          <data id="mj-w-res-data" data-token="8f1b2140d89962bbed083c4c06b6edd4" className="mj-w-data"
  data-apikey="6LsO" data-w-id="J4h" data-lang="de_DE" data-base="https://app.mailjet.com"
  data-width="640" data-height="328" data-statics="statics"/>
          <div>
            <div
              className="mj-w-button mj-w-btn bg-gray-200 hover:bg-gray-300 rounded font-sans inline-block px-3 py-1 mt-4"
              data-token="8f1b2140d89962bbed083c4c06b6edd4"
            >
              Newsletter abonnieren
            </div>
          </div>
          <script type="text/javascript" src="https://app.mailjet.com/statics/js/widget.modal.js"/>
        </Info>
        <Info title="Pfarrzeitung" image="./info-02.svg">
          Ausführliche Berichte zum Pfarrleben, Diskussionen zur Weltkirche, Impulse zum Nachdenken und vieles mehr finden Sie in den Pfarrzeitungen der Pfarren.
          <div>
            <div
              className="bg-gray-200 hover:bg-gray-300 rounded font-sans inline-block px-3 py-1 mt-4 cursor-pointer"
            >
              Pfarrzeitungen ansehen
            </div>
          </div>
        </Info>
      </div>
    </Responsive>
  </Site>
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

const CalenderPeek = ({calendarGroups, calendar, label}: { calendarGroups: CalendarGroups, calendar: string, label: string }) => {
  const borderColor = ({'emmaus': 'border-primary1', 'inzersdorf':'border-primary2', 'neustift':'border-primary3'} as any)[calendar];
  const textColor = ({'emmaus': 'text-primary1', 'inzersdorf':'text-primary2', 'neustift':'text-primary3'} as any)[calendar];
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
      articles: await Cockpit.article({"platform": "eni"}, {"_o": "1"})
    }
  }
}