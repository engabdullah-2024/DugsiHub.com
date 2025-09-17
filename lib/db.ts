// lib/db.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "dh";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI (.env.local)");
}

// Cache the connection promise on globalThis so dev HMR doesn’t open many sockets.
const globalForMongoose = globalThis as unknown as {
  __mongooseConn?: Promise<Mongoose>;
};

export async function dbConnect(): Promise<Mongoose> {
  if (!globalForMongoose.__mongooseConn) {
    globalForMongoose.__mongooseConn = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        serverSelectionTimeoutMS: 8000, // snappier fail in dev
      })
      .catch((err: unknown) => {
        if (
          typeof err === "object" &&
          err &&
          (err as { name?: string }).name === "MongooseServerSelectionError"
        ) {
          console.error(
            "[DB] Atlas not reachable. Make sure your IP is allowlisted (or use 0.0.0.0/0 for dev)."
          );
        }
        throw err;
      });
  }
  return globalForMongoose.__mongooseConn;
}
