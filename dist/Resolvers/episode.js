"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodeResolvers = void 0;
const Episode_1 = __importDefault(require("../Models/Episode"));
const Filter_1 = require("../helpers/Filter");
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Season_1 = __importDefault(require("../Models/Season"));
const SendEmailFollowers_1 = require("../helpers/SendEmailFollowers");
// Querys
const getEpisodes = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const episodes = await Episode_1.default.find(query).populate({
        path: "season",
        populate: {
            path: "serie",
        },
    });
    return episodes;
};
const getEpisode = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const episode = await Episode_1.default.findById(id).populate({
        path: "season",
        populate: {
            path: "serie",
        },
    });
    (0, SendEmailFollowers_1.SendEmailFollowersEpisode)({
        entityID: episode.season.serie.id,
    }, episode.number, episode.season.number);
    if (!episode)
        throw new Error("No se ha encontrado la Episode");
    return episode;
};
// Mutations
const createEpisode = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newEpisode = new Episode_1.default(input);
        await newEpisode.save();
        newEpisode.season = await Season_1.default.findByIdAndUpdate(newEpisode.season, { $inc: { episodesCount: 1 } }, { new: true }).populate({
            path: "serie",
        });
        (0, SendEmailFollowers_1.SendEmailFollowersEpisode)({
            entityID: newEpisode.season.serie.id,
        }, newEpisode.number, newEpisode.season.number);
        return newEpisode;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear la Episode: " + error);
    }
};
const updateEpisode = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const episode = await Episode_1.default.findByIdAndUpdate(id, input, {
            new: true,
        }).populate({
            path: "season",
            populate: {
                path: "serie",
            },
        });
        if (!episode)
            throw new Error("No se ha encontrado la Episode");
        return episode;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Episode: " + error);
    }
};
exports.episodeResolvers = {
    Query: {
        getEpisodes,
        getEpisode,
    },
    Mutation: {
        createEpisode,
        updateEpisode,
    },
};
