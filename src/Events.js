import React, {useState, useEffect} from 'react';
import Radium from 'radium';
import { style } from './style';
import { pad } from './utils';
import Loader from './graphics/Loader';

const Events = () => {
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
        display: 'flex',
        [style.maxmedia(style.mobileBreak)]: {flexDirection: 'column'},
        height: 400,
        background: style.white,
        ...style.shadowed,
    }}>
        <FilterList style={{
            width: 'calc(33% - 80px)',
            [style.maxmedia(style.mobileBreak)]: {width: '100%'},
            padding:  '40px',
            flexShrink: 0,
            ...style.shadowed,
        }} options={{'all': 'Alle', 'emmaus': 'Emmaus', 'neustift': 'Neustift', 'inzersdorf': 'Inzersdorf'}} value={filter} setValue={setFilter}></FilterList>
        <EventList style={{
            flexGrow: 1,
            }}
            loading={loading}
            events={events.filter(event => filter === 'all' || event.pfarre === filter)}
            showPfarre={filter === 'all'}
            ></EventList>
    </div>;
};

const FilterList = ({ options , value , setValue , style }) => {
    return <div style={{cursor: 'pointer', ...style}}>
        {Object.entries(options).map(([key,val]) => (
        <div
            style={{ fontWeight: key === value ? 800 : 300, fontSize: 22, marginBottom: 5 }}
            key={key}
            onClick={() => setValue(key)}
        >{val}</div>))}
    </div>;
}

const parseEvent = event => {
    const date = new Date(event.start.dateTime ?? event.start.date);
    return {
        ...event,
        date: `${pad(date.getDate())}.${pad(date.getMonth()+1)}.${date.getFullYear()}`,
        displayDate: `${['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][date.getDay()]}, ${pad(date.getDate())}.${pad(date.getMonth()+1)}`,
        time: `${pad(date.getHours())}:${pad(date.getMinutes())}`
    };
}
const parseEvents = events => {
    return events.map(parseEvent).reduce(function (r, a) {
        r[a.displayDate] = r[a.displayDate] || [];
        r[a.displayDate].push(a);
        return r;
    }, Object.create(null));
}

const EventList = ({ events, style, showPfarre, loading}) => {
    return loading ? <Loader></Loader> : <div style={{ padding: 40, overflow: 'auto', ...style }}>
        {events.length === 0 ? <div>Keine Termine gefunden!</div> : Object.entries(parseEvents(events)).map(([date, events]) => <div key={date} style={{marginBottom: 20}}>
            <div style={{ fontSize: 16, textDecoration: 'underline' }}>{date}</div>
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
                    {showPfarre ? (<i style={{textTransform: 'capitalize'}}>in {event.pfarre}<br></br></i>) : null}
                    {event.description}
                </div>
             : null}
        </div>
    </div>;
}


export default Radium(Events);