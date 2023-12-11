"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seasonResolvers = void 0;
const Season_1 = __importDefault(require("../Models/Season"));
const Serie_1 = __importDefault(require("../Models/Serie"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
const SendEmailFollowers_1 = require("../helpers/SendEmailFollowers");
// Querys
const getSeasons = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const seasons = await Season_1.default.find(query).populate({
        path: "serie",
        populate: {
            path: "genrers",
        },
    });
    return seasons;
};
const getSeason = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const season = await Season_1.default.findById(id).populate({
        path: "serie",
        populate: {
            path: "genrers",
        },
    });
    if (!season)
        throw new Error("No se ha encontrado el Season");
    return season;
};
// Mutations
const createSeason = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newSeason = new Season_1.default(input);
        await newSeason.save();
        newSeason.serie = await Serie_1.default.findByIdAndUpdate(newSeason.serie, { $inc: { seasons: 1 } }, { new: true }).populate("genrers");
        (0, SendEmailFollowers_1.SendEmailFollowers)({
            entityID: newSeason.serie.id,
        });
        return newSeason;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el Season: " + error);
    }
};
const updateSeason = async (_, { id, input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const season = await Season_1.default.findByIdAndUpdate(id, input, {
            new: true,
        }).populate({
            path: "serie",
            populate: {
                path: "genrers",
            },
        });
        if (!season)
            throw new Error("No se ha encontrado el Season");
        return season;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Season: " + error);
    }
};
exports.seasonResolvers = {
    Query: {
        getSeasons,
        getSeason,
    },
    Mutation: {
        createSeason,
        updateSeason,
    },
};
