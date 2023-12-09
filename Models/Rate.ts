import {Schema, model} from 'mongoose'

const rateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    rate: {
        type: Number,
        required: true
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


export default model('Rate',rateSchema);