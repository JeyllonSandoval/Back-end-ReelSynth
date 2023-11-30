import {Schema, model} from 'mongoose'

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entityType: {
        type: String,
        enum: ['Movie', 'Season', 'Serie', 'Episode', 'Comment'],
        required: true
      },
    entityID: {
        type: Schema.Types.ObjectId,
        refPath: 'entityType',  // Hace referencia al campo 'entityType'
        required: true
    },
    liked: {
        type: Boolean,
        required: true,
        default: true
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

export default model('Like',likeSchema);