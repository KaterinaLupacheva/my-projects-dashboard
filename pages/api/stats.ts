import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';

import { DevtoStatsDoc, FollowersData } from '../../types/general';
import { connectToDatabase } from '../../utils/mongodb';
import { queryDevto } from './devto';

export default async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
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
          followers: [
            { date: moment().format('DD-MM-YYYY'), count: followersCount },
          ],
        })
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .then((doc: any) => {
          existedDoc = doc.ops[0];
        });
    }

    //check if api was called today
    const dateExists = existedDoc.followers.find(
      (item: FollowersData) => item.date === moment().format('DD-MM-YYYY')
    );

    //update followers count
    if (!dateExists) {
      await statsCollection.updateOne(
        { name: 'devto' },
        {
          $push: {
            followers: {
              date: moment().format('DD-MM-YYYY'),
              count: followersCount,
            },
          },
        }
      );
    }

    res.status(200).json('status: OK');
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};
