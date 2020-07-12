import React, {useState, useEffect} from 'react';
import Radium from 'radium';
import { style } from './style';
import { pad } from './utils';
import Loader from './graphics/Loader';

const Events = Radium(() => {
    const [filter, setFilter] = useState('all');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('https://tesarekplatz.at/api/cal.php')
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
        background: style.white,
        ...style.shadowed,
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
            events={events.filter(event => filter === 'all' || event.pfarre === filter || event.pfarre === 'all')}
            showPfarre={filter === 'all'}
        ></EventList>
        <div style={{ gridArea: 'info', color: 'grey', padding: 40 }}>
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
    const date = new Date(event.start.dateTime ?? event.start.date);
    const day = new Date(date);
    day.setHours(0,0,0,0);
    return {
        ...event,
        date: `${pad(date.getDate())}.${pad(date.getMonth()+1)}.${date.getFullYear()}`,
        displayDate: `${['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][date.getDay()]}, ${pad(date.getDate())}.${pad(date.getMonth()+1)}`,
        time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
        value: `${date.getTime()}`,
        day: day.getTime(),
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
    return loading ? <Loader></Loader> : <div style={{ padding: 40, overflow: 'auto', ...style }}>
        {events.length === 0 ? <div>Keine Termine gefunden!</div> : Object.entries(parseEvents(events)).map(([date, events]) => <div key={date} style={{marginBottom: 20}}>
            <div style={{ fontSize: 16, textDecoration: 'underline' }}>{events[0].displayDate}</div>
            {events.map(event => <Event event={event} showPfarre={showPfarre}></Event>)}
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
    </div>;
}


export default Events;