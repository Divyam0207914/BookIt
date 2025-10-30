import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(" Please define MONGODB_URI in your environment variables");
}

const cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      dbName: "BookIt", 
      bufferCommands: false,
      maxPoolSize: 50, 
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000, 
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Connected Successfully");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error(" MongoDB Connection Failed:", err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  (global as any).mongoose = cached;
  return cached.conn;
}
