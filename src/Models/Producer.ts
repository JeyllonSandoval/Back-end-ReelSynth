import {Schema, model} from 'mongoose'

const producerSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    commentCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    imgURL: {
        type: String,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Producer', producerSchema);