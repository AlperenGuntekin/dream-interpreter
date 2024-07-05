import clientPromise from './mongodb';

export async function saveEmailForNewsletter(email: string): Promise<void> {
  try {
    const client = await clientPromise;
    const database = client.db('dream_interpreter');
    const collection = database.collection('newsletter_subscribers');
    await collection.updateOne(
      { email },
      { $set: { email, subscribed_at: new Date() } },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error saving email for newsletter:', error);
    throw new Error('Failed to save email for newsletter');
  }
}
