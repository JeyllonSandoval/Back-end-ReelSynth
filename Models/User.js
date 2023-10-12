import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
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


export default model('User', userSchema);