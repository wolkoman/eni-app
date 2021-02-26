import {NextApiRequest, NextApiResponse} from 'next';
import {google} from 'googleapis';
import {ConfigEntity, DatabaseService} from '../../../util/database';
import {getPublicEvents} from '../../../util/calendar';

export default async function (req: NextApiRequest, res: NextApiResponse){

  res.json(await getPublicEvents());

}
