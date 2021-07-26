export const checkDocExists = async (
  collection: any,
  searchQuery: any
): Promise<any> => {
  return collection
    .find(searchQuery)
    .toArray()
    .then((doc: any) => {
      return doc[0];
    });
};

export const insertDoc = async (collection: any, newDoc: any): Promise<any> => {
  return collection.insertOne(newDoc).then((doc: any) => {
    return doc.ops[0];
  });
};
