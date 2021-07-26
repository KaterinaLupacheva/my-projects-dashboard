import { NextApiRequest, NextApiResponse } from 'next';

import { IViews } from '../../../types/general';
import { checkDateExists } from '../../../utils/date-helpers';
import { checkDocExists, insertDoc } from '../../../utils/db-query';
import { connectToDatabase } from '../../../utils/mongodb';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { param },
  } = req;

  const slug = param.toString();

  if (!slug) {
    return res.status(400).json({
      message: 'Slug not provided',
    });
  }

  const { db } = await connectToDatabase();
  const viewsCollection = await db.collection('view_counts');

  // Check if the doc exists.
  let existedDoc = await checkDocExists(viewsCollection, { slug: slug });

  //if doesn't exist, create new doc
  if (!existedDoc) {
    existedDoc = await insertDoc(viewsCollection, {
      slug: slug,
      totalViews: 0,
      viewsData: [],
    });
  }

  const dateExists = existedDoc && checkDateExists(existedDoc.viewsData);

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
