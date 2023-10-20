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
    entityType: {
        type: String,
        enum: ['Movie', 'Episode'],
        required: true
      },
    entityID: {
        type: Schema.Types.ObjectId,
        refPath: 'entityType',  // Hace referencia al campo 'entityType'
        required: true
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