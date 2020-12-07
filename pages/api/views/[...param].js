import { connectToDatabase } from "../../../utils/mongodb";
import Cors from "cors";
import initMiddleware from "../../../utils/initMiddleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    origin: ["http://localhost:3000", "https://katerinalupacheva.github.io"],
    methods: ["GET"],
  })
);

export default async (req, res) => {
  await cors(req, res);

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
        views: 0,
      })
      .then((doc) => {
        existedDoc = doc.ops[0];
      });
  }

  //increment count views by one
  await viewsCollection.updateOne(
    { slug: slug },
    {
      $set: {
        views: existedDoc.views + 1,
      },
    }
  );

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
    views: document.views,
  });
};
