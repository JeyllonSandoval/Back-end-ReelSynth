import { MONGO_URL } from "./config";
import { connect } from "mongoose";


export const connectDB = async () => {
    try {
        await connect(MONGO_URL);
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
