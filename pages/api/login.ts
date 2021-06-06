import {NextApiRequest, NextApiResponse} from 'next';
import {cockpit} from '../../util/cockpit-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log(req.body);
  res.status(200).json(await cockpit.authUser(req.body.username, req.body.password));
}