"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieResolvers = void 0;
const Movie_1 = __importDefault(require("../Models/Movie"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
// Querys
const getMovies = async (_, { input }) => {
    // controlar si se envia un titulo o un genero
    if (!input)
        input = {};
    const { producer, ...input2 } = input;
    const query = (0, Filter_1.filter)(input2);
    const movies = await Movie_1.default.find(query)
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
        return movies.filter((movie) => movie.studio.producer.id == producer);
    }
    return movies;
};
const getMovie = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const movie = await Movie_1.default.findById(id)
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
    if (!movie)
        throw new Error("No se ha encontrado la movie");
    return movie;
};
const getTopMovies = async (_, { input, top }) => {
    // controlar si se envia un titulo o un genero
    if (!input)
        input = {};
    const { producer, ...input2 } = input;
    const query = (0, Filter_1.filter)(input2);
    const movies = await Movie_1.default.find({ ...query })
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
        return movies.filter((movie) => movie.studio.producer.id == producer);
    }
    return movies;
};
// Mutations
const createMovie = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newMovie = new Movie_1.default({ ...input, user: userToken.id });
        await newMovie.save();
        const movie = await Movie_1.default.findById(newMovie.id)
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
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear la Movie: " + error);
    }
};
const updateMovie = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        console.log(id, input);
        const movie = await Movie_1.default.findByIdAndUpdate(id, input, { new: true })
            .populate({ path: "user", populate: { path: "role country" } })
            .populate("genrers")
            .populate({ path: "studio", populate: { path: "producer" } });
        if (!movie)
            throw new Error("No se ha encontrado la Movie");
        return movie;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Movie: " + error);
    }
};
exports.movieResolvers = {
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
