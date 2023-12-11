import {Schema, model} from 'mongoose'

const movieSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        required: false
    },
    imgURL: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'ACTIVE'
    },
    duration: {
        type: Number,
        required: false,
        default: 0
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId        
    },
    studio: {
        ref: "Studio",
        type: Schema.Types.ObjectId
    },
    genrers: [{
        ref: "Genrer",
        type: Schema.Types.ObjectId
    }],
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


export default model('Movie',movieSchema);