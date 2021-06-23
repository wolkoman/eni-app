import React, {useEffect, useState} from 'react';
import Site from '../components/Site';
import {useUserStore} from '../util/store';

export default function Events() {
  const [data, setData] = useState({username: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [user, login] = useUserStore(state => [state.user, state.login])

  useEffect(() => {
    if(!user?.active){
      setLoading(false);
      setData({username: '', password: ''});
    }
  }, [user]);
  return <Site navbar={false} responsive={false}>
    <div className="w-full h-screen relative flex justify-center items-center">
      <div className="w-full h-screen flex flex-col absolute top-0 left-0">
        <div className="w-full h-full bg-primary1"/>
        <div className="w-full h-full bg-primary1"/>
        <div className="w-full h-full bg-primary1"/>
      </div>
      <div className="z-10 bg-white px-8 py-4 flex flex-col items-center rounded">
        {loading ? <>lädt</> : <>
          <div className="uppercase font-bold text-2xl my-3">eni<span className="font-normal">wien</span></div>
          <input placeholder="Benutzername" className="my-1 p-1"
                 onChange={(event) => setData({...data, username: (event as any).target.value})}/>
          <input placeholder="Passwort" className="my-1 p-1" type="password"
                 onChange={(event) => setData({...data, password: (event as any).target.value})}/>
          <div className="bg-primary1 text-white mt-3 w-full text-center p-1 cursor-pointer rounded" onClick={() => {
            setLoading(true);
            login(data);
          }}>Anmelden</div>
        </>}
      </div>
    </div>
  </Site>;
}