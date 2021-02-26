import {NextApiRequest, NextApiResponse} from 'next';
import {google} from 'googleapis';
import {ConfigEntity, DatabaseService} from '../../../util/database';

export default async function (req: NextApiRequest, res: NextApiResponse){

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_KEY,
    "https://eni.wien/api/google/callback"
  );

  const { tokens } = await oauth2Client.getToken(req.query.code as string);

  const configCollection = await DatabaseService.getCollection(ConfigEntity);
  await configCollection.updateOne({type: "google"}, {$set: {data: tokens}});

  res.json(tokens);

}
