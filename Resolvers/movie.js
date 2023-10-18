import Movie from "../Models/Movie.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"

// Querys
const getMovies = async (_, { input } ) => {
      
      // controlar si se envia un titulo o un genero
      
      const {producer, ...input2} = input
      
      const query = filter(input2)
    

       const movies = await Movie.find(query).populate({
        path: 'user',
        populate: {
          path: 'role'
        }
      }).populate("genrers").populate({
        path: 'studio',
        populate: {
          path: 'producer'
        }
      })

      if(producer){
        return movies.filter(movie => movie.studio.producer.id == producer)
      }
      return movies
    }

const getMovie = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    
    const movie = await Movie.findById(id).populate({
      path: 'user',
      populate: {
        path: 'role'
      }
    }).populate("genrers").populate({
      path: 'studio',
      populate: {
        path: 'producer'
      }
    })

    if(!movie) throw new Error("No se ha encontrado la movie")
    return movie
    }


// Mutations
const createMovie = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken)
        const newMovie = new Movie({...input, user: userToken.id})
        await newMovie.save()
        return await newMovie.populate({
          path: 'user',
          populate: {
            path: 'role'
          }
        }).populate("genrers").populate({
          path: 'studio',
          populate: {
            path: 'producer'
          }
        })
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Movie: "+error.message || error)
    }
}

const updateMovie = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        console.log(id,input)
        const movie = await Movie.findByIdAndUpdate(id, input, {new: true}).populate({ path: 'user', populate: { path: 'role' } }).populate("genrers").populate({ path: 'studio', populate: { path: 'producer' } })
        if(!movie) throw new Error("No se ha encontrado la Movie")
        return movie
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Movie: "+error.message || error)
    }
}

  export const movieResolvers = {
    Query: {
        getMovies,
        getMovie
    },
    Mutation: {
        createMovie,
        updateMovie
    }
}