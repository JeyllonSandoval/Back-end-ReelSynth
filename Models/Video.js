import {Schema, model} from 'mongoose'

const videoSchema = new Schema({
    url: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    host: {
        ref: "Host",
        type: Schema.Types.ObjectId
    },
    episode: {
        ref: "Episode",
        type: Schema.Types.ObjectId
    },
    movie: {
        ref: "Movie",
        type: Schema.Types.ObjectId
    },
    user: {
        ref: "User",
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


export default model('Video',videoSchema);