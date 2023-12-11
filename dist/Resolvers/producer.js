"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.producerResolvers = void 0;
const Producer_1 = __importDefault(require("../Models/Producer"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
// Querys
const getProducers = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const producers = await Producer_1.default.find(query);
    return producers;
};
const getProducer = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const producer = await Producer_1.default.findById(id);
    if (!producer)
        throw new Error("No se ha encontrado la Producer");
    return producer;
};
// Mutations
const createProducer = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newProducer = new Producer_1.default(input);
        await newProducer.save();
        return newProducer;
    }
    catch (error) {
        throw new Error("Error al crear la Producer: " + error);
    }
};
const updateProducer = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const producer = await Producer_1.default.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!producer)
            throw new Error("No se ha encontrado la Producer");
        return producer;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Producer: " + error);
    }
};
exports.producerResolvers = {
    Query: {
        getProducers,
        getProducer,
    },
    Mutation: {
        createProducer,
        updateProducer,
    },
};
