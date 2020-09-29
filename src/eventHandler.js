import { pad } from "./utils";
import { apiUrl } from "./config";
import { toDisplayDate } from "./utils";

const isValidEventToken = (token) =>
  fetch(`${apiUrl}/calendar/v2/?check&token=${token}`)
    .then((x) => x.json())
    .then((x) => Promise.resolve(x.valid));
const fetchRawEvents = ({ customRange }) =>
  fetch(
    `${apiUrl}/calendar-v2/${
      customRange !== undefined
        ? `?start=${customRange?.start}&limit=${customRange?.limit}&token=${customRange?.token}`
        : ""
    }`
  ).then((x) => x.json());

const parseEvent = (event) => {
  const start = event.start.dateTime ?? event.start.date;
  const end = event.end.dateTime ?? event.end.date;
  const date = new Date(start);
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return {
    ...event,
    start,
    end,
    date: `${pad(date.getDate())}.${pad(
      date.getMonth() + 1
    )}.${date.getFullYear()}`,
    displayDate: toDisplayDate(date),
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    value: `${date.getTime()}`,
    day: day.getTime(),
    weekday: date.getDay(),
    location: {
      emmaus: {
        name: "Pfarre Emmaus am Wienerberg",
        address: "Tesarekplatz 2",
        postalCode: "1100",
      },
      neustift: {
        name: "Pfarre Inzersdorf-Neustift",
        address: "Don-Bosco-Gasse 14",
        postalCode: "1230",
      },
      inzersdorf: {
        name: "Pfarre Inzersdorf",
        address: "Draschestraße 105",
        postalCode: "1230",
      },
    }[event.pfarre],
  };
};

const parseEvents = (events) => {
  return sortGroups(
    events.map(parseEvent).reduce((r, a) => {
      r[a.day] = r[a.day] || [];
      r[a.day].push(a);
      return r;
    }, {})
  );
};

const sortGroups = (events) => {
  return Object.fromEntries(
    Object.entries(events)
      .map(([date, group]) => [date, group.sort((a, b) => a.value - b.value)])
      .sort(([date1, group1], [date2, group2]) => date1 - date2)
  );
};

export { parseEvents, fetchRawEvents, isValidEventToken };
