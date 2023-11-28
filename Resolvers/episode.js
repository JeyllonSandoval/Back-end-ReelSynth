
import Episode from "../Models/Episode.js"
import { filter } from "../helpers/Filter.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import Season from "../Models/Season.js"

// Querys
const getEpisodes = async (_, { input }) => {
    const query = filter(input)
    const episodes = await Episode.find(query).populate({
        path: "season",
        populate: {
            path: "serie",
            populate: {
                path: "producer"
            }
        }
    })
    return episodes
    }

const getEpisode = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const episode = await Episode.findById(id).populate({
        path: "season",
        populate: {
            path: "serie",
            populate: {
                path: "producer"
            }
        }
    })
    if(!episode) throw new Error("No se ha encontrado la Episode")
    return episode
    }


// Mutations
const createEpisode = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newEpisode = new Episode(input) 

        await newEpisode.save()
       
        newEpisode.season = await Season.findByIdAndUpdate(newEpisode.season, { $inc: { episodesCount: 1 } }, {new: true} ).populate({
            path: "serie",
            populate: {
                path: "producer"
            }
        })


        return episode
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Episode: "+error.message || error)
    }
}

const updateEpisode = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const episode = await Episode.findByIdAndUpdate(id, input, {new: true}).populate({
            path: "season",
            populate: {
                path: "serie",
                populate: {
                    path: "producer"
                }
            }
        })
        if(!episode) throw new Error("No se ha encontrado la Episode")
        return episode
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Episode: "+error.message || error)
    }
}

  export const episodeResolvers = {
    Query: {
        getEpisodes,
        getEpisode
    },
    Mutation: {
        createEpisode,
        updateEpisode
    }
}