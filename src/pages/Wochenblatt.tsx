import React, { useState } from "react";
import Box from "../components/Box";
import wochenblattGenerator from "../util/wochenblattGenerator";
import cockpit, { host } from "../util/cockpit";
import {
  fetchRawEvents,
  parseEvents,
  ExtendedEventDto,
  Pfarre,
} from "../util/eventHandler";
import { getApiKey, isAdmin } from "../store/auth.selector";
import { connect } from "react-redux";
import { State } from "../store/state";

export default () => {
  return (
    <Box label="Wochenblatt" padded={true}>
      <Generator />
    </Box>
  );
};

const labelStyle = { padding: "15px 0 5px 0" };
const Generator = connect((state: State) => ({
  access: isAdmin(state),
  api_key: getApiKey(state),
}))(({ access, api_key }: { access: boolean; api_key: string }) => {
  const [config, setConfig] = useState<{
    access: boolean;
    start: string;
    limit: string;
    pfarre: Pfarre;
  }>({
    access,
    start: new Date().toISOString().substring(0, 10),
    limit: "+1 week",
    pfarre: "emmaus",
  });
  return (
    <div>
      <div style={labelStyle}>Startdatum</div>
      <input
        type="date"
        value={config.start}
        onChange={e => setConfig({ ...config, start: e.target.value })}
      />
      <div style={labelStyle}>Zeitspanne</div>
      <select
        value={config.limit}
        onChange={e => setConfig({ ...config, limit: e.target.value })}
      >
        <option value="+1 week">Eine Woche</option>
        <option value="+2 week">Zwei Wochen</option>
      </select>
      <div style={labelStyle}>Pfarre</div>
      <select
        value={config.pfarre}
        onChange={e =>
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
                (await cockpit.singleton("wochenblatt", api_key)).template
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
          Generieren
        </button>
      </div>
    </div>
  );
});
