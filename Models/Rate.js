import {Schema, model} from 'mongoose'

const rateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    video: {
        type: Number,
        required: false
    },
    rate: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'ACTIVE'
    },
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Movie',movieSchema);