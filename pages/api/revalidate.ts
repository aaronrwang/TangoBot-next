import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Trigger revalidation of the homepage (or any page you want)
    await res.revalidate('/');  // Adjust if you want a specific path to be revalidated
    return res.json({ revalidated: true });
  } catch (error) {
    console.error('Error during revalidation', error);
    return res.status(500).json({ error: 'Error revalidating the page' });
  }
}