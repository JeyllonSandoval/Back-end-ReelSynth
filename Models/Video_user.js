import {Schema, model} from 'mongoose'

const video_userSchema = new Schema({
    video: {
        ref: "Video",
        type: Schema.Types.ObjectId
    },
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    like: {
        type: Number
    },
    time: {
        type: Number
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


export default model('Video_user',video_userSchema);