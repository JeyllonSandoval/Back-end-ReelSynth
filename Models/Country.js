import {Schema, model} from 'mongoose'

const countrySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Country',countrySchema);