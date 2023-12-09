import {Schema, model} from 'mongoose'

const countrySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    lenguage: {
        type: String,
        required: true,
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


export default model('Country',countrySchema);
