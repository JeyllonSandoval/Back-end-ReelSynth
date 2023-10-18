
import Season from "../Models/Season.js"
import { filter } from "../helpers/Filter.js"

// Querys
const getSeasons = async (_, { input }) => {
    const query = filter(input)
    const seasons = await Season.find(query).populate({
        path: 'serie',
        populate: {
            path: 'genrers'
        }
    })

    return seasons
  }
  
const getSeason = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const season = await Season.findById(id).populate({
        path: 'serie',
        populate: {
            path: 'genrers'
        }
    })
    if(!season) throw new Error("No se ha encontrado el Season")
    return season 
  }


// Mutations
const createSeason = async (_, { input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const newSeason = new Season(input)
        await newSeason.save()
        return await newSeason.populate({
            path: 'serie',
            populate: {
                path: 'genrers'
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear el Season: "+error.message || error)
    }
}

const updateSeason = async (_, { id,input }, { token }) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        if(!id) throw new Error("No se ha enviado un ID")
        const season = await Season.findByIdAndUpdate(id, input, {new: true}).populate({
            path: 'serie',
            populate: {
                path: 'genrers'
            }
        })
        if(!season) throw new Error("No se ha encontrado el Season")
        return season
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar el Season: "+error.message || error)
    }
}

  export const seasonResolvers = {
    Query: {
        getSeasons,
        getSeason
    },
    Mutation: {
        createSeason,
        updateSeason
    }
}