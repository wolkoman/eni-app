import React, { useEffect, useState } from "react";
import Box from "../components/Box";
import { connect } from "react-redux";
import { getApiKey } from "../store/auth.selector";
import { State } from "../store/state";
import { monthNames, pad } from "../util/utils";
import { ButtonSelector } from "../components/FormElements";
import cockpit from "../util/cockpit";
import { apiUrl } from "../util/config";
import { EventDto } from "../util/eventHandler";

const { currentMonth, currentYear } = {
  currentMonth: new Date().getUTCMonth() + 1,
  currentYear: new Date().getFullYear(),
};
const buttons = new Map(
  Array(3)
    .fill(0)
    .map((_, index) => [
      {
        month: ((currentMonth + index - 1) % 12) + 1,
        year: (currentMonth + index >= 13 ? 1 : 0) + currentYear,
      },
      `${monthNames[((currentMonth + index - 1) % 12) + 1]} ${
        (currentMonth + index >= 13 ? 1 : 0) + currentYear
      }`,
    ])
);
type Entry = CalendarEntry | ScheduleEntry;
interface ScheduleEntry {
  type: "SCHEDULE";
  date: string;
  end_time: string;
  start_time: string;
  owner: string;
  id: string;
}
interface CalendarEntry {
  type: "CALENDAR";
  date: string;
  end_time: string;
  start_time: string;
  title: string;
  id: string;
}
interface User {
  _id: string;
  name: string;
}

export default connect((state: State) => ({
  api_key: getApiKey(state),
}))(({ api_key }: { api_key: string }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMonth, setSelectedMonth] = useState({
    month: currentMonth,
    year: currentYear,
  });
  useEffect(() => {
    cockpit.users(api_key).then(setUsers);
    Promise.all([
      fetch(`${apiUrl}/calendar-v2/inzersdorf-messe/?token=${api_key}`)
        .then(x => x.json())
        .then(({ events }: { events: EventDto[] }) =>
          events.map(event => ({
            type: "CALENDAR",
            id: event.id,
            date: event.start.dateTime?.substring(0, 10),
            title: event.title,
            start_time: event.start.dateTime?.substring(11, 16),
            end_time: event.end.dateTime?.substring(11, 16),
          }))
        ),
      cockpit.collection("schedule", api_key).then(response =>
        response.entries.map((entry: any) => ({
          ...entry,
          type: "SCHEDULE",
          id: entry._id,
        }))
      ),
    ]).then((array: Entry[][]) => setEntries(array.flat()));
  }, [api_key]);

  return (
    <div>
      <Box label="Monatsauswahl" padded={true} styled={true}>
        <ButtonSelector
          buttons={buttons}
          active={selectedMonth}
          onChange={setSelectedMonth}
        />
      </Box>
      <Box label="Einteilung" padded={true} styled={true}>
        {Array(new Date(selectedMonth.year, selectedMonth.month, 0).getDate())
          .fill(0)
          .map((_, index) => index + 1)
          .map(day => (
            <DayView
              key={day}
              users={users}
              date={{ ...selectedMonth, day }}
              entries={entries.filter(
                entry =>
                  entry.date ===
                  [selectedMonth.year, selectedMonth.month, day]
                    .map(x => pad(x))
                    .join("-")
              )}
            />
          ))}
      </Box>
      <Box label="Neuer Eintrag" padded={true} styled={true}></Box>
    </div>
  );
});

const DayView = ({
  date,
  entries,
  users,
}: {
  date: { year: number; month: number; day: number };
  entries: Entry[];
  users: User[];
}) => {
  const [active, setActive] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        padding: "4px 0",
        borderBottom: "1px solid #ccc",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div style={{ paddingRight: 10 }}>
        {pad(date.day)}.{pad(date.month)}.{date.year}
      </div>
      <div>
        {entries.map(entry => (
          <div style={{ display: "flex", flexWrap: "wrap" }} key={entry.id}>
            <div style={{ paddingRight: 10 }}>
              {entry.start_time} - {entry.end_time}
            </div>
            <div>
              {entry.type === "SCHEDULE"
                ? users.find(user => user._id === entry.owner)?.name
                : `Reserviert ${entry.title}`}
            </div>
            <div
              style={{
                display: active && entry.type === "SCHEDULE" ? "block" : "none",
                paddingLeft: 10,
              }}
            >
              Löschen
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
