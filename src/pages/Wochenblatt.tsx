import React, { useState, useEffect } from "react";
import Box from "../components/Box";
import wochenblattGenerator from "../util/wochenblattGenerator";
import Loader from "../Graphic/Loader";
import cockpit, { host } from "../util/cockpit";
import {
  fetchRawEvents,
  parseEvents,
  isValidEventToken,
  ExtendedEventDto,
  Pfarre,
} from "../util/eventHandler";
import { localStorageGet, localStorageSet } from "../util/utils";

const CALENDAR_TOKEN = "calendar_token";
const onTokenSubmit = (token: string) => {
  localStorageSet(CALENDAR_TOKEN, token);
  window.location.reload(false);
};

export default () => {
  const [access, setAccess] = useState();
  useEffect(() => {
    isValidEventToken(localStorageGet(CALENDAR_TOKEN)).then((valid) =>
      setAccess(valid)
    );
  }, []);
  return access === undefined ? (
    <Loader />
  ) : (
    <Box label="Wochenblatt" padded={true}>
      {access ? (
        <Generator token={localStorageGet(CALENDAR_TOKEN)} />
      ) : (
        <NoAccess />
      )}
    </Box>
  );
};

const labelStyle = { padding: "15px 0 5px 0" };
const Generator = ({ token }: { token: string }) => {
  const [config, setConfig] = useState<{
    token: string;
    start: string;
    limit: string;
    pfarre: Pfarre;
  }>({
    token,
    start: "2020-01-01",
    limit: "+1 week",
    pfarre: "emmaus",
  });
  return (
    <div>
      <div style={labelStyle}>Startdatum</div>
      <input
        type="date"
        value={config.start}
        onChange={(e) => setConfig({ ...config, start: e.target.value })}
      />
      <div style={labelStyle}>Zeitspanne</div>
      <select
        value={config.limit}
        onChange={(e) => setConfig({ ...config, limit: e.target.value })}
      >
        <option value="+1 week">Eine Woche</option>
        <option value="+2 week">Zwei Wochen</option>
      </select>
      <div style={labelStyle}>Pfarre</div>
      <select
        value={config.pfarre}
        onChange={(e) =>
          setConfig({ ...config, pfarre: e.target.value as Pfarre })
        }
      >
        <option value="emmaus">Emmaus</option>
      </select>
      <div style={labelStyle}>
        <button
          onClick={async () =>
            wochenblattGenerator({
              templateDocumentPath: `${host}/${
                (await cockpit.singleton("wochenblatt")).template
              }`,
              events: parseEvents(
                (
                  await fetchRawEvents({
                    customRange: {
                      start: config.start,
                      limit: config.limit,
                      token: "",
                    },
                  })
                ).filter(
                  (event: ExtendedEventDto) =>
                    event.pfarre === config.pfarre.toLowerCase()
                )
              ),
              pfarre: config.pfarre,
              wochen: ({
                "+1 week": "DIE WOCHE",
                "+2 week": "ZWEI WOCHEN",
              } as any)[config.limit],
              start: "",
              end: "",
            })
          }
        >
          Generate
        </button>
      </div>
    </div>
  );
};

const NoAccess = () => (
  <div>
    <div>Passwort</div>
    <input
      onKeyUp={(e) =>
        e.keyCode === 13 ? onTokenSubmit((e.target as any).value) : null
      }
    />
  </div>
);
