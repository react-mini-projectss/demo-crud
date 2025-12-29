import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("Please define MONGO_URI in environment variables");
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

export async function connectDB(): Promise<void> {
    if (cached.conn) {
        return;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {
            dbName: "crud_assignment",
        });
    }

    cached.conn = await cached.promise;
    console.log("MongoDB Connected");
}
