import { Schema, model } from "mongoose";

const companySchema = new Schema({
    imgURL: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        default: 'ACTIVE'
    }
},
    {
        timestamps: true,
        versionKey: false
    })

export default model('Company', companySchema);