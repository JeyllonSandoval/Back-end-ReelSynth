import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        enum: ['Movie', 'Season', 'Series', 'Episode'],
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
