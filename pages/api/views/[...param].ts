import { NextApiRequest, NextApiResponse } from 'next';

import { IViews } from '../../../types/general';
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
  const viewsCollection = await db.collection('view_counts');

  if (!slug) {
    return res.status(400).json({
      message: 'Article slug not provided',
    });
  }

  // Check and see if the doc exists.
  let existedDoc = await viewsCollection
    .find({
      slug: slug,
    })
    .toArray()
    .then((doc: IViews[]) => {
      return doc[0];
    });

  //if doesn't exist, create new doc
  if (!existedDoc) {
    await viewsCollection
      .insertOne({
        slug: slug,
        totalViews: 0,
        viewsData: [{ date: new Date(), views: 0 }],
      })
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      .then((doc: any) => {
        existedDoc = doc.ops[0];
      });
  }

  //current date in format "YYYY-MM-DD"
  const curDate = new Date().toISOString().substring(0, 10);

  //check if that there are views already today
  const dateExists = existedDoc.viewsData.find(
    (item: any) => item.date.toISOString().substring(0, 10) === curDate
  );

  const midNight = new Date(new Date().setUTCHours(0, 0, 0, 0));

  //increment count views by one
  if (dateExists) {
    //increment today's views count
    await viewsCollection.updateOne(
      {
        slug: slug,
        viewsData: {
          $elemMatch: {
            date: { $gte: midNight },
          },
        },
      },
      {
        $inc: {
          totalViews: 1,
          'viewsData.$.views': 1,
        },
      }
    );
  } else {
    await viewsCollection.updateOne(
      { slug: slug },
      {
        $push: {
          viewsData: {
            date: new Date(),
            views: 1,
          },
        },
        $inc: {
          totalViews: 1,
        },
      }
    );
  }

  //get updated doc
  const document = await viewsCollection
    .find({
      slug: slug,
    })
    .toArray()
    .then((doc: IViews[]) => {
      return doc[0];
    });

  return res.status(200).json({
    document,
  });
};
