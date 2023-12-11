"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostResolvers = void 0;
const Host_1 = __importDefault(require("../Models/Host"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
// Querys
const getHosts = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const hosts = await Host_1.default.find(query);
    return hosts;
};
const getHost = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const host = await Host_1.default.findById(id);
    if (!host)
        throw new Error("No se ha encontrado la Host");
    return host;
};
// Mutations
const createHost = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newHost = new Host_1.default(input);
        await newHost.save();
        return newHost;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear la Host: " + error);
    }
};
const updateHost = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const host = await Host_1.default.findByIdAndUpdate(id, input, { new: true });
        if (!host)
            throw new Error("No se ha encontrado la Host");
        return host;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Host: " + error);
    }
};
exports.hostResolvers = {
    Query: {
        getHosts,
        getHost,
    },
    Mutation: {
        createHost,
        updateHost,
    },
};
