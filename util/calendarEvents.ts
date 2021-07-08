import {google} from 'googleapis';
import {cockpit} from './cockpit-sdk';

const calendarIds = {
  'all': 'admin@tesarekplatz.at',
  'emmaus': 'u08nlhov79dkit0ffi993o6tuk@group.calendar.google.com',
  'inzersdorf': '4fgiuth4nbbi5uqfa35tidnl84@group.calendar.google.com',
  'neustift': 'occ77f3f7sderl9e3b4jdnr5ek@group.calendar.google.com',
};
export type Calendar = keyof typeof calendarIds;

export interface CalendarEvent {
  id: string,
  summary: string,
  description: string,
  date: string,
  start: { dateTime: string },
  end: { dateTime: string },
  calendar: Calendar,
  visibility: string,
  wholeday: boolean,
}

export type CalendarEvents = Record<string, CalendarEvent[]>;

export async function getEvents(props: { public: boolean }): Promise<CalendarEvents> {

  const configResponse = await cockpit.collectionGet('internal-data', {filter: {_id: '60d2474f6264631a2e00035c'}});
  const config = configResponse.entries[0].data;

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_KEY,
  );
  oauth2Client.setCredentials(config);


  const calendar = google.calendar('v3');
  const getTimeOfEvent = (event: any) => new Date(event!.start?.date ?? event!.start?.dateTime!).getTime();
  const todayDate = new Date();
  todayDate.setHours(0);
  const today = todayDate.getTime();
  const allEvents = (await Promise.all(
    Object.entries(calendarIds)
      .map(async ([name, calendarId]) =>
        (await calendar.events.list({
          calendarId,
          auth: oauth2Client,
          timeMin: new Date(today).toISOString(),
          timeMax: new Date(today + 3600000 * 24 * 30 * (props.public ? 1 : 6)).toISOString(),
          singleEvents: true,
          timeZone: 'Europa/Vienna',
          orderBy: 'startTime'
        })).data.items?.map(event => ({
          id: event.id,
          summary: event.summary,
          description: event.description ?? null,
          date: (event.start?.date ?? event.start?.dateTime ?? '').substr(0, 10),
          start: event.start,
          end: event.end,
          calendar: name,
          visibility: event.visibility ?? 'public',
          wholeday: !!event.start?.date,
        } as CalendarEvent)).filter(event => event.summary)
      )
  )).flat()
    .filter(event => !!event) as CalendarEvent[];

  return allEvents
    .filter(event => !props.public || event?.visibility === 'public')
    .map(event => !props.public ? event : ({
        ...event,
        summary: event.summary.replace(/\[.*?]/g, ''),
        description: event.description?.replace(/\[.*?]/g, ''),
      }))
    .sort((a, b) => getTimeOfEvent(a) - getTimeOfEvent(b))
    .reduce((previous, current) => {
      previous[current!.date] = previous[current!.date] ?? [];
      previous[current!.date].push(current);
      return previous;
    }, {} as any);

}