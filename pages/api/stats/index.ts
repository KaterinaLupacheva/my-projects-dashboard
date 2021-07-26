import { NextApiRequest, NextApiResponse } from 'next';

import { checkDateExists } from '../../../utils/date-helpers';
import { checkDocExists, insertDoc } from '../../../utils/db-query';
import { connectToDatabase } from '../../../utils/mongodb';
import { countTotalStarsAndForks } from '../../../utils/stats-helpers';
import { queryDevto } from '../devto';
import { queryGithub } from '../github';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.APP_API_KEY}`) {
        const { db } = await connectToDatabase();
        const statsCollection = await db.collection('stats');

        await handleDevtoStats(statsCollection);
        await handleGithubStats(statsCollection);

        res.status(200).json('status: OK');
      } else {
        res.status(401).json('Not authorized');
      }
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  }
};

async function handleDevtoStats(statsCollection: any) {
  const { followersCount } = await queryDevto();

  // Check if devto doc exists.
  let devtoDoc = await checkDocExists(statsCollection, {
    name: 'devto',
  });

  //if doesn't exist, create new doc
  if (!devtoDoc) {
    devtoDoc = await insertDoc(statsCollection, {
      name: 'devto',
      followers: [{ date: new Date(), count: followersCount }],
    });
  }

  const dateExists = checkDateExists(devtoDoc.followers);

  //update followers count
  if (!dateExists) {
    await statsCollection.updateOne(
      { name: 'devto' },
      {
        $push: {
          followers: {
            date: new Date(),
            count: followersCount,
          },
        },
      }
    );
  }
}

async function handleGithubStats(statsCollection: any) {
  const { user, repos } = await queryGithub();

  const { stars, forks } = countTotalStarsAndForks(repos, user.login);

  // Check if devto doc exists.
  let githubDoc = await checkDocExists(statsCollection, {
    name: 'github',
  });

  const curDate = new Date();
  //if doesn't exist, create new doc
  if (!githubDoc) {
    githubDoc = await insertDoc(statsCollection, {
      name: 'github',
      followers: [{ date: curDate, count: user.followers }],
      repos: [{ date: curDate, count: user.public_repos }],
      stars: [{ date: curDate, count: stars }],
      forks: [{ date: curDate, count: forks }],
    });
  }

  const dateExists = checkDateExists(githubDoc.followers);

  //update counts
  if (!dateExists) {
    await statsCollection.updateOne(
      { name: 'github' },
      {
        $push: {
          followers: {
            date: curDate,
            count: user.followers,
          },
          repos: { date: curDate, count: user.public_repos },
          stars: { date: curDate, count: stars },
          forks: { date: curDate, count: forks },
        },
      }
    );
  }
}
