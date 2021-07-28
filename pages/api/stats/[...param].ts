import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../../utils/mongodb';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { param },
  } = req;

  const slug = param.toString();

  const { db } = await connectToDatabase();
  const statsCollection = await db.collection('stats');

  const result = await statsCollection.findOne({ name: slug });

  if (slug === 'devto') {
    return res.status(200).json({
      followersStats: result.followers,
    });
  }

  if (slug === 'github') {
    return res.status(200).json({
      followersStats: result.followers,
      reposStats: result.repos,
      starsStats: result.stars,
      forksStats: result.forks,
    });
  }

  if (slug === 'twitter') {
    return res.status(200).json({
      followersStats: result.followers,
    });
  }
};
