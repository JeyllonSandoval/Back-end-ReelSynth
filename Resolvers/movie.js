import Movie from "../Models/Movie.js"

// Querys
const getMovies = async (_, { input }) => {
    const Movies = await Movie.find()
    if(!input) return Movies
    return Movies.filter( (movie) => movie.title.toUpperCase().includes(input.title.toUpperCase()) ||  movie.description.includes(input.description) || movie.year.includes(input.year)
    ||movie.rating.includes(input.rating) || movie.imgURL.includes(input.imgURL) || movie.user.includes(input.user) || movie.id === input.id )
  }
  
const getMovie = async (_, { id }) => { 
    if(!id) throw new Error("No se ha enviado un ID")
    const movie = await Role.findById(id)
    if(!movie) throw new Error("No se ha encontrado la movie")
    return movie
  }


// Mutations
const createMovie = async (_, { input }) => {
    try {
        const {title, description, year, rating, imgURL, user} = input
        const newMovie = new Movie({title, description, year, rating, imgURL, user})
        await newMovie.save()
        return newMovie
    } catch (error) {
        console.log(error)
        throw new Error("Error al crear la Movie")
    }
}

const updateMovie = async (_, { id,input }) => {
    try {
        //console.log(id, input)
        if(!id) throw new Error("No se ha enviado un ID")
        const movie = await Movie.findByIdAndUpdate(id, input, {new: true})
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