import Movie from "../Models/Movie";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { filter } from "../helpers/Filter";

import { ContextInput } from "../Types/Context";
import { MovieType } from "../Types/Movie";

interface MovieInput {
    id: string;
    input: MovieType | Object;
    top: number;
}

// Querys
const getMovies = async (_: any, { input }: MovieInput) => {
    // controlar si se envia un titulo o un genero
    if (!input) input = {};
    const { producer, ...input2 }: any = input;

    const query = filter(input2);

    const movies: any = await Movie.find(query)
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("genrers")
        .populate({
            path: "studio",
            populate: {
                path: "producer",
            },
        });

    if (producer) {
        return movies.filter(
            (movie: MovieType) => movie.studio.producer.id == producer
        );
    }
    return movies;
};

const getMovie = async (_: any, { id }: MovieInput) => {
    if (!id) throw new Error("No se ha enviado un ID");

    const movie = await Movie.findById(id)
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("genrers")
        .populate({
            path: "studio",
            populate: {
                path: "producer",
            },
        });

    if (!movie) throw new Error("No se ha encontrado la movie");
    return movie;
};

const getTopMovies = async (_: any, { input, top }: MovieInput) => {
    // controlar si se envia un titulo o un genero
    if (!input) input = {};
    const { producer, ...input2 }: any = input;

    const query = filter(input2);

    const movies: any = await Movie.find({ ...query })
        .sort({ rating: -1, likeCount: -1 })
        .limit(top)
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("genrers")
        .populate({
            path: "studio",
            populate: {
                path: "producer",
            },
        });

    if (producer) {
        return movies.filter(
            (movie: MovieType) => movie.studio.producer.id == producer
        );
    }
    return movies;
};

// Mutations
const createMovie = async (
    _: any,
    { input }: MovieInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newMovie = new Movie({ ...input, user: userToken.id });
        await newMovie.save();
        const movie = await Movie.findById(newMovie.id)
            .populate({
                path: "user",
                populate: {
                    path: "role country",
                },
            })
            .populate("genrers")
            .populate({
                path: "studio",
                populate: {
                    path: "producer",
                },
            });

        return movie;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la Movie: " + error);
    }
};

const updateMovie = async (
    _: any,
    { id, input }: MovieInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        console.log(id, input);
        const movie = await Movie.findByIdAndUpdate(id, input, { new: true })
            .populate({ path: "user", populate: { path: "role country" } })
            .populate("genrers")
            .populate({ path: "studio", populate: { path: "producer" } });
        if (!movie) throw new Error("No se ha encontrado la Movie");
        return movie;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Movie: " + error);
    }
};

export const movieResolvers = {
    Query: {
        getMovies,
        getMovie,
        getTopMovies,
    },
    Mutation: {
        createMovie,
        updateMovie,
    },
};
