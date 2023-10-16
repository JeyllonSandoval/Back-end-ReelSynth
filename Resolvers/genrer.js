
import Genrer from "../Models/Genrer.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"

// Querys
const getGenrers = async (_, { input }) => {
    const genrers = await Genrer.find()
    return genrers
    }

const getGenrer = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const genrer = await Genrer.findById(id)
    if(!genrer) throw new Error("No se ha encontrado la Genrer")
    return genrer
    }


// Mutations
const createGenrer = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newGenrer = new Genrer(input)
        await newGenrer.save()
        return await newGenrer
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Genrer")
    }
}

const updateGenrer = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const genrer = await Genrer.findByIdAndUpdate(id, input, {new: true})
        if(!genrer) throw new Error("No se ha encontrado la Genrer")
        return genrer
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Genrer")
    }
}

  export const genrerResolvers = {
    Query: {
        getGenrers,
        getGenrer
    },
    Mutation: {
        createGenrer,
        updateGenrer
    }
}