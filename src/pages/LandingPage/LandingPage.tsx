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
      <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10}}>Karfreitag</div>
      <Event time="14:30 Uhr" label="Die sieben Worte Jesu am Kreuz" ort={Ort.NEUSTIFT}/>
      <Event time="15:00 Uhr" label="Gedenken der Todesstunde Jesu (Kreuzwegandacht)" ort={Ort.NIKOLAUS}/>
      <Event time="15:00 Uhr" label="7 Worte Jesu am Kreuz/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="16:00 Uhr" label="Offene Kirche mit der Möglicheit des stillen Gedenkens an Jesu" ort={Ort.NIKOLAUS}/>
      <Event time="16:00 Uhr" label="Karfreitagsliturgie für Kinder" ort={Ort.NEUSTIFT}/>
      <Event time="18:00 Uhr" label="Karfreitagsliturgie/Pfr. Dr. Brezovski" ort={Ort.EMMAUS}/>
      <Event time="18:00 Uhr" label="Karfreitagsliturgie/P. Alois" ort={Ort.NEUSTIFT}/>
      <Event time="19:00 Uhr" label="Karfreitagsliturgie/Oliver Meidl" ort={Ort.NIKOLAUS}/>
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