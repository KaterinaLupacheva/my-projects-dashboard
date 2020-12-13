import { connectToDatabase } from "../../../utils/mongodb";
import moment from "moment";

export default async (req, res) => {
  const {
    query: { param },
  } = req;

  const slug = param.toString();

  const { db } = await connectToDatabase();
  const viewsCollection = await db.collection("view_counts");

  if (!slug) {
    return res.status(400).json({
      message: "Article slug not provided",
    });
  }

  // Check and see if the doc exists.
  let existedDoc = await viewsCollection
    .find({
      slug: slug,
    })
    .toArray()
    .then((doc) => {
      return doc[0];
    });

  //if doesn't exist, create new doc
  if (!existedDoc) {
    await viewsCollection
      .insertOne({
        slug: slug,
        totalViews: 0,
        viewsData: [{ date: moment().format("DD-MM-YYYY"), views: 0 }],
      })
      .then((doc) => {
        existedDoc = doc.ops[0];
      });
  }

  //check if that there are views already today
  const dateExists = existedDoc.viewsData.find(
    (item) => item.date === moment().format("DD-MM-YYYY")
  );

  //increment count views by one
  if (dateExists) {
    await viewsCollection.updateOne(
      { slug: slug, "viewsData.date": moment().format("DD-MM-YYYY") },
      {
        $inc: {
          totalViews: 1,
          "viewsData.$.views": 1,
        },
      }
    );
  } else {
    await viewsCollection.updateOne(
      { slug: slug },
      {
        $push: {
          viewsData: {
            date: moment().format("DD-MM-YYYY"),
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
    .then((doc) => {
      return doc[0];
    });

  return res.status(200).json({
    document,
  });
};
