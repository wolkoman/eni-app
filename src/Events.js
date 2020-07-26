import React, {useState, useEffect} from 'react';
import Radium from 'radium';
import { style, style as globalStyle } from './style';
import { parseEvents } from './eventParser';
import Loader from './graphics/Loader';
import { JSONLD, Generic } from 'react-structured-data';

const Events = Radium(() => {
    const [filter, setFilter] = useState(/*localStorage.getItem('filter') ?? 'all'*/ 'emmaus');
    const [events, setEvents] = useState([]);
    const [state, setState] = useState('LOADING');
    useEffect(() => {
        localStorage.setItem('filter', filter)
    }, [filter])
    useEffect(() => {
        fetch('https://api.eni.wien/calendar/v1/')
            .then(x => x.json())
            .then(x => setEvents(x))
            .then(() => setState('LOADED'))
            .catch(() => setState('FAILED'));
    }, [])
    return <div style={{
        display: 'grid',
        gridTemplateColumns: "1fr 2fr",
        gridTemplateAreas: '"filter content" "filter content"',
        [style.mobile]: { gridTemplateAreas: '"filter" "content"', gridTemplateColumns: "1fr", gridTemplateRows: "70px 1fr" },
        height: 500,
    }}>
        <FilterList
            style={{
                gridArea: 'filter',
                padding: style.padding,
                flexDirection: 'column',
                [style.mobile]: { padding: style.padding/2, flexDirection: 'row', justifyContent: 'center', height: 30 },
                color: globalStyle.dark,
                cursor: 'pointer',
                display: 'flex',
            }}
            options={{ 'all': 'Alle', 'emmaus': 'Emmaus', 'neustift': 'Neustift', 'inzersdorf': 'Inzersdorf' }}
            value={filter}
            setValue={setFilter}
        ></FilterList>
        <EventList
            style={{
                gridArea: 'content',
                [style.mobile]: { boxShadow: '0px 5px 5px -5px rgba(0,0,0,0.1) inset' },
            }}
            state={state}
            events={events.filter(event => filter === 'all' || event.pfarre === filter)}
            showPfarre={filter === 'all'}
            warning={filter !== 'emmaus'}
        ></EventList>
    </div>;
});

const FilterList = Radium(({ options , value , setValue , style }) => {
    return <div style={style}>
        {Object.entries(options).map(([key,val]) => (
        <div
            style={{ fontWeight: key === value ? 800 : 300, fontSize: 22, marginBottom: 5, marginRight: 10 }}
            key={key}
            onClick={() => setValue(key)}
        >{val}</div>))}
    </div>;
})

const EventList = Radium(({ events, style, showPfarre, state, warning}) => {
    return <div style={{
        ...style,
        padding: globalStyle.padding,
        overflow: 'auto',
        boxShadow: '5px 0px 5px -5px rgba(0,0,0,0.1) inset',
    }}>
        {{
            LOADING: <Loader></Loader>,
            LOADED: (
                events.length === 0
                ? <div>Keine Termine gefunden!</div>
                : <div>
                    {warning ? <div style={{ fontStyle: 'italic', paddingBottom: 30, textAlign: 'center'}}>Achtung, die Termine der Pfarren Inzersdorf und Inzersdorf-Neustift sind noch nicht vollständig.</div> : null}
                    {Object.entries(parseEvents(events)).map(([ date, events ]) => 
                    <DateGroup
                        events={events}
                        showPfarre={showPfarre}
                        style={{ marginBottom: 20 }}
                        key={date}
                    ></DateGroup>
                    )}
                </div>
            ),
            FAILED: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <img src="/calendar-fail.svg" style={{ width: 200, paddingBottom: 20 }} alt="Kalendar schlägt fehl"></img>
                <div>Termine können nicht geladen werden.</div>
            </div>
        }[state]}
    </div>
});

const DateGroup = Radium(({ events, showPfarre, style }) => 
    <div style={style}>
        <div style={{
            fontSize: 16,
            textDecoration: 'underline'
        }}>
            {events[0].displayDate}
        </div>
        {
            events.map(event => 
                <Event key={event.id} event={event} showPfarre={showPfarre}></Event>
            )
        }
    </div>
);

const Event = ({ event, showPfarre }) => {
    const color = (pfarre) => ({emmaus: style.accent1, neustift: style.accent2, inzersdorf: style.accent3}[pfarre]);
    return <div key={ event.id } style={{ display: 'flex', ...style.serif, fontWeight: 600, fontSize: 20, marginTop: 5 }}>
        <div style={{ width: 70, flexGrow: 0, flexShrink: 0, display: event.wholeday ? 'none' : 'auto' }}>
            {event.time}
        </div>
        { true && !event.wholeday ? <div style={{ width: 20, flexGrow: 0, flexShrink: 0, display: 'flex' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color(event.pfarre), marginTop: 10 }}></div>
        </div> : null }
        <div>
            {event.title}
            {event.description || showPfarre ?
                <div style={{ fontSize: 14, fontWeight: 'normal' }}>
                    {showPfarre && event.pfarre !== 'all' ? (<i style={{ textTransform: 'capitalize' }}>in { event.pfarre }<br></br></i>) : null}
                    {event.description}
                </div>
             : null}
        </div>
        {event.pfarre !== 'all' && event.wholeday === false ? <EventSchema event={event}></EventSchema> : null }
    </div>;
}

const EventSchema = ({ event }) => <JSONLD>
    <Generic type="event" jsonldtype="Event" schema={{ name: event.title, startDate: event.start, endDate: event.end }}>
        <Generic type="location" jsonldtype="Place" schema={{name: event.location.name}}>
            <Generic type="address" jsonldtype="PostalAddress" schema={{ 
                addressLocality: 'Vienna',
                addressRegion: 'VIE',
                postalCode: event.location.postalCode,
                streetAdress: event.location.address
            }}/>
        </Generic>
    </Generic>
</JSONLD>;


export default Events;