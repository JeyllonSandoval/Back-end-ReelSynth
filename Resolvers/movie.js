import Movie from "../Models/Movie.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"
import { filter } from "../helpers/Filter.js"

// Querys
const getMovies = async (_, { input }, ctx,{fieldNodes} ) => {
      let query = {}
      // controlar si se envia un titulo o un genero
      
      if(input)
      {
        query = filter(input)
      }
      
/*
      const shouldPopulateUser = fieldNodes.some(node =>
          node.selectionSet.selections.some(
            selection => selection.name.value === 'user'
          )
      );

        const shouldPopulateGenrers = fieldNodes.some(node =>
          node.selectionSet.selections.some(
            selection => selection.name.value === 'genrers'
          )
        );

        const shouldPopulateStudios = fieldNodes.some(node =>
          node.selectionSet.selections.some(
            selection => selection.name.value === 'studios'
          )
        );

      let movies = []
      if(shouldPopulateUser && shouldPopulateGenrers){
        movies = await Movie.find(query).populate({
          path: 'user',
          populate: {
            path: 'role'
          }
        }).populate("genrers")
      }else if(shouldPopulateUser){
        movies = await Movie.find(query).populate({
          path: 'user',
          populate: {
            path: 'role'
          }
        });
      }
      else if(shouldPopulateGenrers){
          movies = await Movie.find(query).populate("genrers")
      }else{
        movies = await Movie.find(query)
      }
    */

      const movies = await Movie.find(query).populate({
        path: 'user',
        populate: {
          path: 'role'
        }
      }).populate("genrers").populate("studio")
    return movies
    }

const getMovie = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    
    const movie = await Movie.findById(id).populate({
      path: 'user',
      populate: {
        path: 'role'
      }
    }).populate("genrers").populate("studio")

    if(!movie) throw new Error("No se ha encontrado la movie")
    return movie
    }


// Mutations
const createMovie = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        console.log(input)
        const newMovie = await new Movie({...input, user: userToken.id})
        await newMovie.save()
        return await newMovie.populate({
          path: 'user',
          populate: {
            path: 'role'
          }
        }).populate("genrers")
        
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Movie")
    }
}

const updateMovie = async (_, { id,input}, {token}) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        if(!id) throw new Error("No se ha enviado un ID")
        console.log(id,input)
        const movie = await Movie.findByIdAndUpdate(id, input, {new: true}).populate({ path: 'user', populate: { path: 'role' } }).populate("genrers")
        console.log(movie)
        if(!movie) throw new Error("No se ha encontrado la Movie")
        return movie
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la Movie")
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