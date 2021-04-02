import React from 'react';
import Churches from '../../components/Churches';
import Title from './Title';
import Box from '../../components/Box';

enum Ort{
  EMMAUS = "Pfarre Emmaus am Wienerberg",
  NIKOLAUS = "Pfarre Inzersdorf - St. Nikolaus",
  NEUSTIFT = "Pfarre Inzersdorf-Neustift",
}

export default () => (
  <div>
    <Title/>
    <Churches/>
    <Box label="Termine" padded={true} styled={true}>
      <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 15}}>Karfreitag</div>
      <Event time="14:30 Uhr" label="Die sieben Worte Jesu am Kreuz" ort={Ort.NEUSTIFT}/>
      <Event time="15:00 Uhr" label="Gedenken der Todesstunde Jesu (Kreuzwegandacht)" ort={Ort.NIKOLAUS}/>
      <Event time="15:00 Uhr" label="7 Worte Jesu am Kreuz/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="16:00 Uhr" label="Offene Kirche mit der Möglicheit des stillen Gedenkens an Jesu" ort={Ort.NIKOLAUS}/>
      <Event time="16:00 Uhr" label="Karfreitagsliturgie für Kinder" ort={Ort.NEUSTIFT}/>
      <Event time="18:00 Uhr" label="Karfreitagsliturgie/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="18:00 Uhr" label="Karfreitagsliturgie/P. Alois" ort={Ort.NEUSTIFT}/>
      <Event time="19:00 Uhr" label="Karfreitagsliturgie/Oliver Meidl" ort={Ort.NIKOLAUS}/>

      <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 15}}>Karsamstag</div>
      <Event time="08:00 Uhr" label="Laudes/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="08:30 Uhr" label="Grabwache (bis 16:00 Uhr)" ort={Ort.EMMAUS}/>
      <Event time="16:00 Uhr" label="Speisensegnung/Pfr. Dr. Brezovski" ort={Ort.NIKOLAUS}/>
      <Event time="16:00 Uhr" label="Feier der Grabesruhe für Kinder" ort={Ort.NEUSTIFT}/>
      <Event time="17:00 Uhr" label="Speisensegnung/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="17:00 Uhr" label="Speisensegnung" ort={Ort.NEUSTIFT}/>
      <Event time="21:00 Uhr" label="Osternachtfeier mit P. Alois SDB" ort={Ort.NEUSTIFT}/>
      <Event time="21:00 Uhr" label="Auferstehungsfeier/Pfr. Dr. Brezovski" ort={Ort.NIKOLAUS}/>

      <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 15}}>Ostersonntag</div>
      <Event time="05:00 Uhr" label="Auferstehungsfeier/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="09:00 Uhr" label="Hl. Messe/Kpl. Gil" ort={Ort.NIKOLAUS}/>
      <Event time="10:00 Uhr" label="Hl. Messe mit P. Hermann SDB (bitte um Anmeldung in Kanzlei)" ort={Ort.NEUSTIFT}/>
      <Event time="10:30 Uhr" label="Hl. Messe/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>

      <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 15}}>Ostermontag</div>
      <Event time="10:00 Uhr" label="Hl. Messe/P. Josef SDB (bitte um Anmeldung in Kanzlei)" ort={Ort.NEUSTIFT}/>
      <Event time="10:30 Uhr" label="Hl. Messe/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
    </Box>
  </div>
);

function Event({time, label, ort}: { time: string, label: string, ort: Ort }) {
  return <div style={{display: "flex", marginBottom: 10}}>
    <div style={{width: 100, fontSize: 18, flexShrink: 0, flexGrow: 0}}>
      {time}
    </div>
    <div style={{flexShrink: 0, flexGrow: 0}}>
      <span style={{fontSize: 18}}>{label}</span>
      <br/>{ort}
    </div>
  </div>
}