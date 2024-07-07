import mongoose from "mongoose";

export default async function connectMongoDB(uri){
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(error);
    }
}