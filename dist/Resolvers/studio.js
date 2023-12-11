"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioResolvers = void 0;
const Studio_1 = __importDefault(require("../Models/Studio"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
// Querys
const getStudios = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const studios = await Studio_1.default.find(query).populate("producer");
    return studios;
};
const getStudio = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const studio = await Studio_1.default.findById(id).populate("producer");
    if (!studio)
        throw new Error("No se ha encontrado el Studio: " + id);
    return studio;
};
// Mutations
const createStudio = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newStudio = new Studio_1.default(input);
        await newStudio.save();
        return await newStudio.populate("producer");
    }
    catch (error) {
        throw new Error("Error al crear la Studio: " + error);
    }
};
const updateStudio = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const studio = await Studio_1.default.findByIdAndUpdate(id, input, {
            new: true,
        }).populate("producer");
        if (!studio)
            throw new Error("No se ha encontrado la Studio");
        return studio;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Studio: " + error);
    }
};
exports.studioResolvers = {
    Query: {
        getStudios,
        getStudio,
    },
    Mutation: {
        createStudio,
        updateStudio,
    },
};
