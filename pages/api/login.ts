import {NextApiRequest, NextApiResponse} from 'next';
import {cockpit} from '../../util/cockpit-sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  let body = JSON.parse(req.body);
  res.status(200).json(await cockpit.authUser(body.username, body.password));
}