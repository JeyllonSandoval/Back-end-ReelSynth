import {Schema, model} from 'mongoose'

const studioSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    producer: {
        type: Schema.Types.ObjectId,
        ref: 'Producer'
    },
    imgURL: {
        type: String,
        trim: true
    },
    likeCount: {
        type: Number,
        default: 0
      }
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Studio', studioSchema);