

// export const connectdb = async() => {
//     try {
//         await mongoose.connect(process.env.db);
//         console.log("connected to db");
//     }
//     catch(error) {
//         console.log(error);
//     }
// }
import mongoose from 'mongoose';

export const connectdb = async () => {
    try {
        await mongoose.connect(process.env.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000, // Increase the timeout (50 seconds)
            socketTimeoutMS: 45000, // Increase socket timeout (45 seconds)
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with a failure code
    }
};




