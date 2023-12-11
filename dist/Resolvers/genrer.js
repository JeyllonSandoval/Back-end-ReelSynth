"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genrerResolvers = void 0;
const Genrer_1 = __importDefault(require("../Models/Genrer"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
// Querys
const getGenrers = async (_, { input }) => {
    const genrers = await Genrer_1.default.find(input);
    return genrers;
};
const getGenrer = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const genrer = await Genrer_1.default.findById(id);
    if (!genrer)
        throw new Error("No se ha encontrado la Genrer");
    return genrer;
};
// Mutations
const createGenrer = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newGenrer = new Genrer_1.default(input);
        await newGenrer.save();
        return newGenrer;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear la Genrer: " + error);
    }
};
const updateGenrer = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const genrer = await Genrer_1.default.findByIdAndUpdate(id, input, { new: true });
        if (!genrer)
            throw new Error("No se ha encontrado la Genrer");
        return genrer;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Genrer: " + error);
    }
};
exports.genrerResolvers = {
    Query: {
        getGenrers,
        getGenrer,
    },
    Mutation: {
        createGenrer,
        updateGenrer,
    },
};
