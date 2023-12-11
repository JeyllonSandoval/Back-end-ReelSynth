"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serieResolvers = void 0;
const Serie_1 = __importDefault(require("../Models/Serie"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
// Querys
const getSeries = async (_, { input }) => {
    if (!input)
        input = {};
    const { producer, ...input2 } = input;
    const query = (0, Filter_1.filter)(input2);
    const series = await Serie_1.default.find(query)
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
        return series.filter((serie) => serie?.studio?.producer?.id == producer);
    }
    return series;
};
const getSerie = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const serie = await Serie_1.default.findById(id)
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
    if (!serie)
        throw new Error("No se ha encontrado la Serie");
    return serie;
};
const getTopSeries = async (_, { input, top }) => {
    if (!input)
        input = {};
    const { producer, ...input2 } = input;
    const query = (0, Filter_1.filter)(input2);
    const series = await Serie_1.default.find(query)
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
        return series.filter((serie) => serie.studio.producer.id == producer);
    }
    return series;
};
// Mutations
const createSerie = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newSerie = new Serie_1.default({ ...input, user: userToken.id });
        await newSerie.save();
        const serie = await Serie_1.default.findById(newSerie.id)
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
        return serie;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear la Serie: " + error);
    }
};
const updateSerie = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const serie = await Serie_1.default.findByIdAndUpdate(id, input, { new: true })
            .populate({ path: "user", populate: { path: "role country" } })
            .populate("genrers")
            .populate({ path: "studio", populate: { path: "producer" } });
        if (!serie)
            throw new Error("No se ha encontrado la Serie");
        return serie;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Serie: " + error);
    }
};
exports.serieResolvers = {
    Query: {
        getSeries,
        getSerie,
        getTopSeries,
    },
    Mutation: {
        createSerie,
        updateSerie,
    },
};
