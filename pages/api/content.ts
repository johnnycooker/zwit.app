import {NextApiRequest, NextApiResponse} from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body;
    if (!body.name) {
      return res.status(500).json({ msg: 'Name was not found' });
    }
  
    res.status(200).json({ name: body.name});
}