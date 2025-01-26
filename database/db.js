import mongoose from "mongoose";

export const connectdb = async() => {
    try {
        await mongoose.connect(process.env.db);
        console.log("connected to db");            
    }
    catch(error) {
        console.log(error);
    }
}