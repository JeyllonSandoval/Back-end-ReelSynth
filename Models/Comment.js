import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    serie: {
        type: Schema.Types.ObjectId,
        ref: 'Serie'
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
    parent: {
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
