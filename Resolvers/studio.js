
import Studio from "../Models/Studio.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"
// Querys
const getStudios = async (_, { input }) => {
    const query = filter(input)
    const studios = await Studio.find(query).populate("producer")
    return studios
}

const getStudio = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const studio = await Studio.findById(id).populate("producer")
    if(!studio) throw new Error("No se ha encontrado la Studio: "+error.message || error)
    return studio
    }


// Mutations
const createStudio = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newStudio = new Studio(input) 
        await newStudio.save()
        return await newStudio.populate("producer")
    } catch (error) {
        throw new Error("Error al crear la Studio: "+error.message || error)
    }
}

const updateStudio = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const studio = await Studio.findByIdAndUpdate(id, input, {new: true}).populate("producer")
        if(!studio) throw new Error("No se ha encontrado la Studio")
        return studio
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Studio: "+error.message || error)
    }
}

  export const studioResolvers = {
    Query: {
        getStudios,
        getStudio
    },
    Mutation: {
        createStudio,
        updateStudio
    }
}