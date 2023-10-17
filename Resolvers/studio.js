
import Studio from "../Models/Studio.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"
// Querys
const getStudios = async (_, { input }) => {
    const query = filter(input)
    const studios = await Studio.find(query)
    return studios
}

const getStudio = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const studio = await Studio.findById(id)
    if(!studio) throw new Error("No se ha encontrado la Studio")
    return studio
    }


// Mutations
const createStudio = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newStudio = new Studio(input) 
        await newStudio.save()
        return newStudio
    } catch (error) {
        throw new Error("Error al crear la Studio: "+error.message)
    }
}

const updateStudio = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const studio = await Studio.findByIdAndUpdate(id, input, {new: true})
        if(!studio) throw new Error("No se ha encontrado la Studio")
        return studio
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Studio")
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