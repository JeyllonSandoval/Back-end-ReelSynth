import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        enum: ['Movie', 'Season', 'Serie', 'Episode'],
        required: true
      },
    entityID: {
        type: Schema.Types.ObjectId,
        refPath: 'entityType',  // Hace referencia al campo 'entityType'
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    commentCount: {
        type: Number,
        default: 0
    },
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
    }
}, { 
    timestamps: true,
    versionKey: false
});

export default model('Comment',commentSchema);


