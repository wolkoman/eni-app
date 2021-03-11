import {ConfigEntity, DatabaseService} from './database';
import {google} from 'googleapis';

type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
export type CalendarEvents = Unpromise<ReturnType<typeof getPublicEvents>>;

export async function getPublicEvents(){

  const configCollection = await DatabaseService.getCollection(ConfigEntity);
  const config = await configCollection.findOne({type: "google"});

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_KEY,
  );
  oauth2Client.setCredentials(config?.data);

  const calendarIds = {
    "all": "admin@tesarekplatz.at",
    "emmaus": "u08nlhov79dkit0ffi993o6tuk@group.calendar.google.com",
    "inzersdorf": "4fgiuth4nbbi5uqfa35tidnl84@group.calendar.google.com",
    "neustift": "occ77f3f7sderl9e3b4jdnr5ek@group.calendar.google.com",
  };

  const calendar = google.calendar("v3");
  const todayDate = new Date();
  todayDate.setHours(0);
  const today = todayDate.getTime();
  const c = await Promise.all(
    Object.entries(calendarIds)
      .map(async ([name, calendarId]) =>
        (await calendar.events.list({
          calendarId,
          auth: oauth2Client,
          timeMin: new Date(today).toISOString(),
          timeMax: new Date(today + 3600000 * 24 * 30).toISOString(),
          singleEvents: true
        })).data.items?.map(event => ({
          id: event.id,
          summary: event.summary,
          description: event.description ?? null,
          date: (event.start?.date ?? event.start?.dateTime ?? "").substr(0,10),
          start: event.start,
          end: event.end,
          calendar: name,
          visibility: event.visibility ?? null,
          wholeday : !!event.start?.date,
        })).filter(event => event.summary)
      )
  );

  const getTimeOfEvent = (event: any) => new Date(event!.start?.date ?? event!.start?.dateTime!).getTime();

  return c.flat()
    .filter(event => !!event)
    .filter(event => event?.visibility === "public")
    .sort((a,b) => getTimeOfEvent(a) - getTimeOfEvent(b));

}