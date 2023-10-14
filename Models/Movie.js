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
        trim: false
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
    user: {
        ref: 'User',
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