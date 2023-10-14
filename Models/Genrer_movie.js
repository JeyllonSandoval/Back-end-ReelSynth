import {Schema, model} from 'mongoose'

const genrer_movieSchema = new Schema({
    genrer: {
        type: Schema.Types.ObjectId,
        ref: 'Genrer'
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
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


export default model('Genrer_movie',genrer_movieSchema);