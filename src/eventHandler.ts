import { pad } from "./util/utils";
import { apiUrl } from "./util/config";
import { toDisplayDate } from "./util/utils";

export type Pfarre = "emmaus" | "inzersdorf" | "neustift" | "all";
export interface EventDto {
  attachments: any;
  description: string;
  end: { dateTime?: string; date?: string };
  start: { dateTime?: string; date?: string };
  id: string;
  location: string;
  pfarre: Pfarre;
  title: string;
  visibility: "public";
  wholeday: boolean;
  place: Pfarre;
}
export interface ExtendedEventDto {
  title: string;
  description: string;
  id: string;
  day: number;
  start: string;
  end: string;
  date: string;
  time: string;
  value: number;
  weekday: number;
  displayDate: string;
  wholeday: boolean;
  pfarre: Pfarre;
  location: any;
  place: Pfarre;
  attachments: {
    title: string;
    iconLink: string;
    fileId: string;
    fileUrl: string;
  }[];
}

const isValidEventToken = (token: string) =>
  fetch(`${apiUrl}/calendar/v2/?check&token=${token}`)
    .then((x) => x.json())
    .then((x) => Promise.resolve(x.valid));
const fetchRawEvents = ({
  customRange,
}: {
  customRange?: { start: string; limit: string; token: string };
}) =>
  fetch(
    `${apiUrl}/calendar-v2/${
      customRange !== undefined
        ? `?start=${customRange?.start}&limit=${customRange?.limit}&token=${customRange?.token}`
        : ""
    }`
  ).then((x) => x.json());

const parseEvent = (event: EventDto): ExtendedEventDto => {
  const start = event.start.dateTime ?? event.start.date;
  const end = event.end.dateTime ?? event.end.date;
  const date = new Date(start!);
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return {
    ...event,
    start: start!,
    end: end!,
    date: `${pad(date.getDate())}.${pad(
      date.getMonth() + 1
    )}.${date.getFullYear()}`,
    displayDate: toDisplayDate(date),
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    value: date.getTime(),
    day: day.getTime(),
    weekday: date.getDay(),
    location: ({
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
    } as any)[event.pfarre],
  };
};

const parseEvents = (
  events: EventDto[]
): Record<string, ExtendedEventDto[]> => {
  return sortGroups(
    events.map(parseEvent).reduce((r, a) => {
      r[a.day] = r[a.day] || [];
      r[a.day].push(a);
      return r;
    }, {} as any)
  );
};

const sortGroups = (events: ExtendedEventDto) => {
  return Object.fromEntries(
    Object.entries(events)
      .map(([date, group]) => [
        date,
        group.sort(
          (a: ExtendedEventDto, b: ExtendedEventDto) => a.value - b.value
        ),
      ])
      .sort(([date1, group1], [date2, group2]) => date1 - date2)
  );
};

export { parseEvents, fetchRawEvents, isValidEventToken };
