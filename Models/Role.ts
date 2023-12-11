import {Schema, model} from 'mongoose'

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
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


export default model('Role',roleSchema);
