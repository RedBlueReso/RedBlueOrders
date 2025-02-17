import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGO DB connected : ',connection?.connection?.host);
    } catch (error) {
        console.log('Error in db-connectDB.js-connectDB : ',error);
        process.exit(1);
    }
}