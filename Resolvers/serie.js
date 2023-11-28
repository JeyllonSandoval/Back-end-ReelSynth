
import Serie from "../Models/Serie.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"
import User from "../Models/User.js"

// Querys
const getSeries = async (_, { input }) => {
    if(!input) input = {}
    const {producer, ...input2} = input

    const query = filter(input2)
    const series = await Serie.find(query).populate({
        path: 'user',
        populate: {
          path: 'role country'
        }
      }).populate("genrers").populate({
        path: 'studio',
        populate: {
          path: 'producer'
        }
      })

    if(producer){
        return series.filter(serie => serie.studio.producer.id == producer)
      }
    return series
    }

const getSerie = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const serie = await Serie.findById(id).populate({
        path: 'user',
        populate: {
          path: 'role country'
        }
      }).populate("genrers").populate({
        path: 'studio',
        populate: {
          path: 'producer'
        }
      })
    if(!serie) throw new Error("No se ha encontrado la Serie")
    return serie
    }


// Mutations
const createSerie = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const newSerie = new Serie({...input, user: userToken.id})
        await newSerie.save()

        const serie = await Serie.findById(newSerie.id).populate({
            path: 'user',
            populate: {
              path: 'role country'
            }
          }).populate("genrers").populate({
            path: 'studio',
            populate: {
              path: 'producer'
            }
          })

        return serie
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Serie: "+error.message || error)
    }
}

const updateSerie = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        const serie = await Serie.findByIdAndUpdate(id, input, {new: true}).populate({ path: 'user', populate: { path: 'role country' } }).populate("genrers").populate({ path: 'studio', populate: { path: 'producer' } })
        if(!serie) throw new Error("No se ha encontrado la Serie")
        return serie
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Serie: "+error.message || error)
    }
}

  export const serieResolvers = {
    Query: {
        getSeries,
        getSerie
    },
    Mutation: {
        createSerie,
        updateSerie
    }
}