import {Schema, model, Model, Document} from 'mongoose'
import bcrypt from 'bcryptjs'
import { RoleType } from '../Types/Role';
export interface IUser extends Document {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    imgURL: string,
    email: string,
    status: string,
    country: Schema.Types.ObjectId,
    role: Schema.Types.ObjectId | RoleType | undefined
}

interface IUserModel extends Model<IUser> {
    encryptPassword(password: string): string;
    comparePassword(password: string, receivedPassword: string): boolean;
}

const userSchema = new Schema<IUser>({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgURL: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    role: {
        ref: "Role",
        type: Schema.Types.ObjectId
    }
    
},
    {
        timestamps: true,
        versionKey: false 
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    console.log("Cifrando contrasena: " + password)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}


export default model<IUser, IUserModel>('User', userSchema);
