import {Schema, model} from 'mongoose'

const genrer_serieSchema = new Schema({
    serie: [{
        type: Schema.Types.ObjectId,
        ref: 'Serie'
    }],
    genrer: [{
        type: Schema.Types.ObjectId,
        ref: 'Genrer'
    }],
    status: {
        type: String,
        default: 'ACTIVE'
    },
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Genrer_serie',genrer_serieSchema);