import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.NEXT_PUBLIC_MONGODB_URI as string;

let client: MongoClient;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      tls: true,
    });
    await client.connect();
  }
  // Ensure the correct collection name is used
  return client.db('dreaminterpretationapp').collection('Dream Interpretation');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, dream, interpretation } = req.body;

    if (!email || !dream || !interpretation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const collection = await connectToDatabase();
      const result = await collection.insertOne({
        email,
        dream,
        interpretation,
        date: new Date(),
      });

      res.status(200).json({ message: 'Dream saved successfully', result });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to save dream' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
