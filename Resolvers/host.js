
import Host from "../Models/Host.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"

// Querys
const getHosts = async (_, { input }) => {
    const hosts = await Host.find()
    return hosts
    }

const getHost = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const host = await Host.findById(id)
    if(!host) throw new Error("No se ha encontrado la Host")
    return host
    }


// Mutations
const createHost = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newHost = new Host(input) 
        await newHost.save()
        return newHost
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Host: "+error.message || error)
    }
}

const updateHost = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const host = await Host.findByIdAndUpdate(id, input, {new: true})
        if(!host) throw new Error("No se ha encontrado la Host")
        return host
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Host: "+error.message || error)
    }
}

  export const hostResolvers = {
    Query: {
        getHosts,
        getHost
    },
    Mutation: {
        createHost,
        updateHost
    }
}