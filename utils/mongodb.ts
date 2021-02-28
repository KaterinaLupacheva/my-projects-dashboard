/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cached = (global as any).mongo;
if (!cached) cached = (global as any).mongo = {};

export async function connectToDatabase(): Promise<any> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const conn = {};
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    //@ts-ignore
    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        //@ts-ignore
        conn.client = client;
        return client.db(MONGODB_DB);
      })
      .then((db) => {
        //@ts-ignore
        conn.db = db;
        cached.conn = conn;
      });
  }
  await cached.promise;
  return cached.conn;
}
