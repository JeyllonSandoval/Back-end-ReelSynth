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
    rating: {
        type: Number
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
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Serie',serieSchema);