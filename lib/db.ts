import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! 

if(!MONGODB_URI){
    throw new Error("Define mongodb_uri in env file.")
}

// let cached = global.mongoose;

// if (!cached) {
//   global.mongoose = { conn: null, promise: null };
//   cached = global.mongoose;
// }
    const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });




export async function connectToDatabase() {
    if(!cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {}
        mongoose
            .connect(MONGODB_URI, opts)
            .then(()=> mongoose.Connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }
    return cached.conn
}