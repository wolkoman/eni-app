import React, {useState, useEffect} from 'react';
import Radium from 'radium';
import { style } from './style';
import { pad } from './utils';
import Loader from './graphics/Loader';
import { JSONLD, Generic } from 'react-structured-data';

const Events = Radium(() => {
    const [filter, setFilter] = useState('all');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://eni.wien/api/calendar/v1/')
            .then(x => x.json())
            .then(x => setEvents(x))
            .then(() => setLoading(false));
    }, [])
    return <div style={{
        display: 'grid',
        gridTemplateColumns: "1fr 2fr",
        gridTemplateAreas: '"filter content" "info content"',
        [style.mobile]: { gridTemplateAreas: '"filter" "content" "info"', gridTemplateColumns: "1fr" },
        height: 500,
    }}>
        <FilterList style={{
            gridArea: 'filter',
            padding:  40,
            flexDirection: 'column',
            [style.mobile]: { padding:  20, flexDirection: 'row', justifyContent: 'center', height: 30 },
        }} options={{ 'all': 'Alle', 'emmaus': 'Emmaus', 'neustift': 'Neustift', 'inzersdorf': 'Inzersdorf' }} value={filter} setValue={setFilter}></FilterList>
        <EventList style={{
            gridArea: 'content',
            }}
            loading={loading}
            events={events.filter(event => filter === 'all' || event.pfarre === filter)}
            showPfarre={filter === 'all'}
        ></EventList>
        <div style={{ gridArea: 'info', color: 'grey', padding: 40, display: 'none' }}>
            Kalendar herunterladen
        </div>
    </div>;
});

const FilterList = Radium(({ options , value , setValue , style }) => {
    return <div style={{
        cursor: 'pointer',
        display: 'flex',
        ...style,
        [style.mobile]: { flexDirection: 'row', background: 'red' },
        }}>
        {Object.entries(options).map(([key,val]) => (
        <div
            style={{ fontWeight: key === value ? 800 : 300, fontSize: 22, marginBottom: 5, marginRight: 10 }}
            key={key}
            onClick={() => setValue(key)}
        >{val}</div>))}
    </div>;
})

const parseEvent = event => {
    const start = event.start.dateTime ?? event.start.date;
    const date = new Date(start);
    const day = new Date(date);
    day.setHours(0,0,0,0);
    return {
        ...event,
        start, 
        date: `${pad(date.getDate())}.${pad(date.getMonth()+1)}.${date.getFullYear()}`,
        displayDate: `${['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][date.getDay()]}, ${pad(date.getDate())}.${pad(date.getMonth()+1)}`,
        time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
        value: `${date.getTime()}`,
        day: day.getTime(),
        location: {
            emmaus: { name: 'Pfarre Emmaus am Wienerberg', address: '', postalCode: '1100' },
            neustift: { name: 'Pfarre Inzersdorf-Neustift', address: '', postalCode: '1230' },
            inzersdorf: { name: 'Pfarre Inzersdorf', address: '', postalCode: '1230' },
        }[event.pfarre],
    };
}
const parseEvents = events => {
    return sortGroups(events.map(parseEvent).reduce((r, a) => {
        r[a.day] = r[a.day] || [];
        r[a.day].push(a);
        return r;
    }, {}));
}
const sortGroups = events => {
    return Object.fromEntries(
        Object.entries(events)
            .map(([date, group]) => ([date, group.sort((a,b) => a.value - b.value)]))
            .sort(([date1, group1],[date2, group2]) => date1 - date2)
    );
};

const EventList = ({ events, style, showPfarre, loading}) => {
    return <div style={{ padding: 40, overflow: 'auto', ...style, boxShadow: '5px 0px 5px -5px rgba(0,0,0,0.2) inset' }}>
        {loading ? <Loader></Loader> : events.length === 0 ? <div>Keine Termine gefunden!</div> : Object.entries(parseEvents(events)).map(([date, events]) => <div key={date} style={{marginBottom: 20}}>
            <div style={{ fontSize: 16, textDecoration: 'underline' }}>{events[0].displayDate}</div>
            {events.map(event => 
                <Event key={event.id} event={event} showPfarre={showPfarre}></Event>
            )}
        </div>
        )}</div>
}

const Event = ({ event, showPfarre }) => {
    return <div key={event.id} style={{display: 'flex', ...style.serif, fontWeight: 600, fontSize: 20, marginTop: 5}}>
        <div style={{width: 70, flexGrow: 0, flexShrink: 0, display: event.wholeday ? 'none' : 'auto'}}>
            {event.time}
        </div>
        <div>
            {event.title}
            {event.description || showPfarre ?
                <div style={{fontSize: 14, fontWeight: "normal"}}>
                    {showPfarre && event.pfarre !== 'all' ? (<i style={{textTransform: 'capitalize'}}>in {event.pfarre}<br></br></i>) : null}
                    {event.description}
                </div>
             : null}
        </div>
        {event.pfarre !== 'all' ? <JSONLD>
            <Generic type="event" jsonldtype="Event" schema={{ name: event.title, startDate: event.start }}>
                <Generic type="location" jsonldtype="Place" schema={{name: event.location.name}}>
                    <Generic type="address" jsonldtype="PostalAddress" schema={{ 
                        addressLocality: 'Vienna',
                        addressRegion: 'VIE',
                        postalCode: event.location.postalCode,
                        streetAdress: event.location.address
                    }}/>
                </Generic>
            </Generic>
        </JSONLD> : null }
    </div>;
}


export default Events;