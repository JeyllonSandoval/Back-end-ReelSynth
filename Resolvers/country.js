
import Country from "../Models/Country.js"
import { filter } from "../helpers/Filter.js"
import { verifyAdmin } from "../utils/auth.js"
import { verifyToken } from "../utils/Token.js"
// Querys
const getCountrys = async (_, { input }) => {

    const query = filter(input)
    const countrys = await Country.find(query)

    return countrys
  }
  
const getCountry = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const country = await Country.findById(id)
    if(!country) throw new Error("No se ha encontrado el country")
    return country 
  }


// Mutations
const createCountry = async (_, { input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const newCountry = new Country(input)
        await newCountry.save()
        return newCountry
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el country: "+error.message || error)
    }
}

const updateCountry = async (_, { id,input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        if(!id) throw new Error("No se ha enviado un ID")
        const country = await Country.findByIdAndUpdate(id, input, {new: true})
        if(!country) throw new Error("No se ha encontrado el country")
        return country
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el country: "+error.message || error)
    }
}

  export const countryResolvers = {
    Query: {
        getCountrys,
        getCountry
    },
    Mutation: {
        createCountry,
        updateCountry
    }
}