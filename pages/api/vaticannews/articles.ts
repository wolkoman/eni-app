import {NextApiRequest, NextApiResponse} from 'next';
import Parser from 'rss-parser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  let parser = new Parser();
  let feed = await parser.parseURL("https://www.vaticannews.va/de.rss.xml");

  res.status(200).json(feed);
}