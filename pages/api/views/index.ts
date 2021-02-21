import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../utils/mongodb';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { db } = await connectToDatabase();
  const viewsCollection = await db.collection('view_counts');

  //get all docs
  const docs = await viewsCollection.find().toArray();

  return res.status(200).json({
    docs,
  });
};
