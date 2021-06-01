import Calendar from '../components/Calendar';
import React from 'react';
import {getPublicEvents} from '../util/calendar';
import {DatabaseService} from '../util/database';
import Site from '../components/Site';

export default function Events({calendarGroups}: any) {
  return <Site navbar={false} responsive={false}>
    <div className="w-full h-screen relative flex justify-center items-center">
      <div className="w-full h-screen flex flex-col absolute top-0 left-0">
        <div className="w-full h-full bg-primary1"></div>
        <div className="w-full h-full bg-primary2"></div>
        <div className="w-full h-full bg-primary3"></div>
      </div>
      <div className="z-10 bg-white px-8 py-4 flex flex-col items-center">
        <div className="uppercase font-bold text-2xl my-3">eni.wien</div>
        <input placeholder="Benutzername" className="my-1"/>
        <input placeholder="Passwort" className="my-1" type="password"/>
        <div className="bg-primary1 text-white mt-3 w-full text-center p-1 cursor-pointer">Anmelden</div>
      </div>
    </div>
  </Site>;
}


export async function getServerSideProps() {
  let publicEvents = await getPublicEvents();
  await DatabaseService.close();
  return {
    props: {
      calendarGroups: publicEvents
    }
  }
}