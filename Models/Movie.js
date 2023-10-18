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
    rating: {
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
    }]
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Movie',movieSchema);