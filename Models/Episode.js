import {Schema, model} from 'mongoose'

const episodeSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    year: {
        type: String,
        require: true
    },
    rating: {
        type: Number
    },
    season: {
        ref: "Season",
        type: Schema.Types.ObjectId
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


export default model('Episode',episodeSchema);