import {Schema, model} from 'mongoose'

const seasonSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        trim: true
    },
    commentCount: {
        type: Number,
        default: 0
    },
    serie: {
        ref: "Serie",
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    likeCount: {
        type: Number,
        default: 0
      },
    rateCount: {
        type: Number,
        default: 0
    },
    rateTotal: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    episodesCount: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Season',seasonSchema);