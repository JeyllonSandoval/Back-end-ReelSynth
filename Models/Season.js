import {Schema, model} from 'mongoose'

const seasonSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    serie: {
        ref: "Serie",
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


export default model('Season',seasonSchema);