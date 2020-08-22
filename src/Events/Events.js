import React, { useState, useEffect } from "react";
import Radium from "radium";
import { style, style as globalStyle } from "../style";
import { parseEvents, fetchRawEvents } from "../eventHandler";
import Loader from "../Graphics/Loader";
import Event from "./Event";

const Events = Radium(() => {
  const [filter, setFilter] = useState(
    /*localStorage.getItem('filter') ?? 'all'*/ "emmaus"
  );
  const [events, setEvents] = useState([]);
  const [state, setState] = useState("LOADING");
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);
  useEffect(() => {
    fetchRawEvents({})
      .then((x) => setEvents(x))
      .then(() => setState("LOADED"))
      .catch(() => setState("FAILED"));
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gridTemplateAreas: '"filter content" "filter content"',
        [style.mobile]: {
          gridTemplateAreas: '"filter" "content"',
          gridTemplateColumns: "1fr",
          gridTemplateRows: "70px 1fr",
        },
        height: 500,
      }}
    >
      <FilterList
        style={{
          gridArea: "filter",
          padding: style.padding,
          flexDirection: "column",
          [style.mobile]: {
            padding: style.padding / 2,
            flexDirection: "row",
            justifyContent: "center",
            height: 30,
          },
          color: globalStyle.dark,
          cursor: "pointer",
          display: "flex",
        }}
        options={{
          all: "Alle",
          emmaus: "Emmaus",
          neustift: "Neustift",
          inzersdorf: "Inzersdorf",
        }}
        value={filter}
        setValue={setFilter}
      ></FilterList>
      <EventList
        style={{
          gridArea: "content",
          [style.mobile]: {
            boxShadow: "0px 5px 5px -5px rgba(0,0,0,0.1) inset",
          },
        }}
        state={state}
        events={events.filter(
          (event) => filter === "all" || event.pfarre === filter
        )}
        showPfarre={filter === "all"}
        warning={filter !== "emmaus"}
      ></EventList>
    </div>
  );
});

const FilterList = Radium(({ options, value, setValue, style }) => {
  return (
    <div style={style}>
      {Object.entries(options).map(([key, val]) => (
        <div
          style={{
            fontWeight: key === value ? 800 : 300,
            fontSize: 22,
            marginBottom: 5,
            marginRight: 10,
          }}
          key={key}
          onClick={() => setValue(key)}
        >
          {val}
        </div>
      ))}
    </div>
  );
});

const EventList = Radium(({ events, style, showPfarre, state, warning }) => {
  return (
    <div
      style={{
        ...style,
        padding: globalStyle.padding,
        overflow: "auto",
        boxShadow: "5px 0px 5px -5px rgba(0,0,0,0.1) inset",
      }}
    >
      {warning ? (
        <div
          style={{
            fontStyle: "italic",
            padding: 10,
            marginBottom: 20,
            textAlign: "center",
            background: "#eee",
            borderRadius: globalStyle.borderRadius,
          }}
        >
          Achtung, die Termine der Pfarren Inzersdorf und Inzersdorf-Neustift
          sind noch nicht vollständig.
        </div>
      ) : null}
      {
        {
          LOADING: <Loader/>,
          LOADED:
            events.length === 0 ? (
              <div>Keine Termine gefunden!</div>
            ) : (
              <div>
                {Object.entries(parseEvents(events)).map(([date, events]) => (
                  <DateGroup
                    events={events}
                    showPfarre={showPfarre}
                    style={{ marginBottom: 20 }}
                    key={date}
                  ></DateGroup>
                ))}
              </div>
            ),
          FAILED: (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <img
                src="/calendar-fail.svg"
                style={{ width: 200, paddingBottom: 20 }}
                alt="Kalendar schlägt fehl"
              ></img>
              <div>Termine können nicht geladen werden.</div>
            </div>
          ),
        }[state]
      }
    </div>
  );
});

const DateGroup = Radium(({ events, showPfarre, style }) => (
  <div style={style}>
    <div
      style={{
        fontSize: 16,
        textDecoration: "underline",
      }}
    >
      {events[0].displayDate}
    </div>
    {events.map((event) => (
      <Event key={event.id} event={event} showPfarre={showPfarre}/>
    ))}
  </div>
));



export default Events;