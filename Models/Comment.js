import {Schema, model} from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    series: {
        type: Schema.Types.ObjectId,
        ref: 'Series'
    },
    season: {
        type: Schema.Types.ObjectId,
        ref: 'Season'
    },
    episode: {
        type: Schema.Types.ObjectId,
        ref: 'Episode'
    },  
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'ACTIVE'
    }
}, { 
    timestamps: true,
    versionKey: false
});

export default model('Comment',commentSchema);
