
import {connect} from 'mongoose';


export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}