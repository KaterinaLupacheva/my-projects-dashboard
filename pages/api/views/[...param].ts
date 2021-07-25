import { NextApiRequest, NextApiResponse } from 'next';

import { DailyViews, IViews } from '../../../types/general';
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

  //check if that there are views already today
  const dateExists = existedDoc.viewsData.find(
    (item: DailyViews) =>
      item.date.substring(0, 10) === new Date().toISOString().substring(0, 10)
  );

  //increment count views by one
  if (dateExists) {
    await viewsCollection.updateOne(
      { slug: slug, 'viewsData.date': new Date() },
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
