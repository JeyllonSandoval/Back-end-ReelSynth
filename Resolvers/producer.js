
import Producer from "../Models/Producer.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"
// Querys
const getProducers = async (_, { input }) => {
    const query = filter(input)
    const producers = await Producer.find(query)
    return producers
}

const getProducer = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const producer = await Producer.findById(id)
    if(!producer) throw new Error("No se ha encontrado la Producer")
    return producer
    }


// Mutations
const createProducer = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newProducer = new Producer(input) 
        await newProducer.save()
        return newProducer
    } catch (error) {
        throw new Error("Error al crear la Producer: "+error.message)
    }
}

const updateProducer = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const producer = await Producer.findByIdAndUpdate(id, input, {new: true})
        if(!producer) throw new Error("No se ha encontrado la Producer")
        return producer
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Producer")
    }
}

  export const ProducerResolvers = {
    Query: {
        getProducers,
        getProducer
    },
    Mutation: {
        createProducer,
        updateProducer
    }
}