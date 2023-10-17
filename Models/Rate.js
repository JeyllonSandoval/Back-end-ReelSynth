import {Schema, model} from 'mongoose'

const rateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    serie: {
        type: Schema.Types.ObjectId,
        ref: 'Serie'
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
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