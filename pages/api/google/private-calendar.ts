import {NextApiRequest, NextApiResponse} from 'next';
import {DatabaseService} from '../../../util/database';
import {getPrivateEvents} from '../../../util/calendar';
import {cockpit} from '../../../util/cockpit-sdk';

export default async function (req: NextApiRequest, res: NextApiResponse){

  const permission = await fetch(`${cockpit.host}/api/singletons/get/ReaderPlanning?token=${req.query.token}`).then(x => x.text()).then(x => x === "");

  console.log(permission);
  if(!permission){
    res.status(400).json({error: "unauthorized"});
    return;
  }

  let publicEvents = await getPrivateEvents();

  await DatabaseService.close();
  res.json(publicEvents);

}
