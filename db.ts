
import {connect} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config( { path: './.env' } );

const MONGO_URL = process.env.MONGO_URL || '';

export const connectDB = async () => {
    try {
        await connect(MONGO_URL);
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}