import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL

const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect(`${DATABASE_URL}/E-comm`);
        console.log("Database is connected");
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }
}

export default connectDb;

