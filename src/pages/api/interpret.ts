import { NextApiRequest, NextApiResponse } from 'next';
import { interpretDream } from '../../utils/ai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { dream } = req.body;
      if (!dream) {
        res.status(400).json({ error: 'Dream content is required' });
        return;
      }
      const interpretation = await interpretDream(dream);
      res.status(200).json({ interpretation });
    } catch (error: any) {
      console.error('Error in interpret API:', error.message, error.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
