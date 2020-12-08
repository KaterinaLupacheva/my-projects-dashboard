import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const viewsCollection = await db.collection("view_counts");

  //get all docs
  let docs = await viewsCollection.find().toArray();

  return res.status(200).json({
    docs,
  });
};
