import React from 'react';
import Box from './Box';
import {Label} from './FormElements';

export default () => {
  return (
    <Box label="Newsletter" padded={true} styled={true}>
      <div>
        <div style={{paddingBottom: 15}}>
          <Label label="ENI - Newsletter"/>
          In unserem monatlichen Newsletter informieren wir kurz und prägnant
          über zukünftige, aktuelle und vergangene Geschehnisse in unseren
          drei Pfarren. Durch Angabe Ihrer E-Mail Adresse können wir auch
          Ihnen den Newsletter jeweils zum Monatsbeginn zustellen.
        </div>
        <div style={{paddingBottom: 15}}>
          <Label label="Anmeldung"/>
          Die Anmeldung geschieht vorübergehend per Mail an die E-Mail Adresse <a
          href="mailto:pfarre.inzersdorf@katholischekirche.at">pfarre.inzersdorf@katholischekirche.at</a>. Schreiben Sie
          uns in der Mail, dass Sie mit der datenschutzrechtlichen Verarbeitung Ihrer E-Mail Adresse zum Zwecke des
          Newsletter Versands einverstanden sind. Vielen Dank!
        </div>
      </div>
    </Box>
  );
};