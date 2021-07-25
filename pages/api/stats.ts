import { NextApiRequest, NextApiResponse } from 'next';

import { DevtoStatsDoc } from '../../types/general';
import { connectToDatabase } from '../../utils/mongodb';
import { queryDevto } from './devto';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.APP_API_KEY}`) {
        const { followersCount } = await queryDevto();

        const { db } = await connectToDatabase();
        const statsCollection = await db.collection('stats');

        // Check and see if the doc exists.
        let existedDoc = await statsCollection
          .find({
            name: 'devto',
          })
          .toArray()
          .then((docs: DevtoStatsDoc[]) => {
            return docs[0];
          });

        //if doesn't exist, create new doc
        if (!existedDoc) {
          await statsCollection
            .insertOne({
              name: 'devto',
              followers: [{ date: new Date(), count: followersCount }],
            })
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            .then((doc: any) => {
              existedDoc = doc.ops[0];
            });
        }

        //current date in format "YYYY-MM-DD"
        const curDate = new Date().toISOString().substring(0, 10);

        //check if api was called today
        const dateExists = existedDoc.followers.find(
          (item: any) => item.date.toISOString().substring(0, 10) === curDate
        );

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

        res.status(200).json('status: OK');
      } else {
        res.status(401).json('Not authorized');
      }
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  }

  if (req.method === 'GET') {
    const { db } = await connectToDatabase();
    const statsCollection = await db.collection('stats');

    const docs = await statsCollection.find({ name: 'devto' }).toArray();

    return res.status(200).json({
      followersStats: docs[0].followers,
    });
  }
};
