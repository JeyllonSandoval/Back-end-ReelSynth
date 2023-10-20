import {Schema, model} from 'mongoose'

const serieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    seasons: {
        type: Number,
        default: 0
    },
    studio: {
        type: Schema.Types.ObjectId,
        ref: 'Studio'
    },
    genrers: [{
        type: Schema.Types.ObjectId,
        ref: 'Genrer'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    likeCount: {
        type: Number,
        default: 0
      },
    commentCount: {
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
    }
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Serie',serieSchema);