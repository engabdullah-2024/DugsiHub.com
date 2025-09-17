// lib/db.ts
import mongoose, { Mongoose } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var __mongoose_conn: Promise<Mongoose> | undefined;
}

export async function dbConnect(): Promise<Mongoose> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "dh";
  if (!uri) throw new Error("Missing MONGODB_URI (.env.local)");

  if (!global.__mongoose_conn) {
    global.__mongoose_conn = mongoose
      .connect(uri, {
        dbName,
        serverSelectionTimeoutMS: 8000, // default ~30s; 8s feels snappier in dev
      })
      .catch((err) => {
        if (err?.name === "MongooseServerSelectionError") {
          console.error(
            "[DB] Atlas not reachable. Did you allowlist your IP in Network Access or use 0.0.0.0/0 for dev?"
          );
        }
        throw err;
      });
  }
  return global.__mongoose_conn;
}
