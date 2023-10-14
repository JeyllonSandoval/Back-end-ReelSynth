import Movie from "../Models/Movie.js"
import { verifyToken } from "../utils/Token.js"
import { verifyAdmin } from "../utils/auth.js"

// Querys
const getMovies = async (_, { input }) => {
    const Movies = await Movie.find().populate("User")
    return Movies
    }

const getMovie = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const movie = await Role.findById(id).populate("User")
    if(!movie) throw new Error("No se ha encontrado la movie")
    return movie
    }


// Mutations
const createMovie = async (_, { input }, {token}) => {
    try {
        const userToken = verifyToken(token)
        verifyAdmin(userToken) 
        const {title, description, year, rating, imgURL} = input
        const newMovie = new Movie({title, description, year, rating, imgURL, user:userToken.id, genrers}).populate("User")
        await newMovie.save()
        return newMovie
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
        const movie = await Movie.findByIdAndUpdate(id, input, {new: true}).populate("User")
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