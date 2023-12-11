"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryResolvers = void 0;
const Country_1 = __importDefault(require("../Models/Country"));
const Filter_1 = require("../helpers/Filter");
const auth_1 = require("../utils/auth");
const Token_1 = require("../utils/Token");
// Querys
const getCountrys = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const countrys = await Country_1.default.find(query);
    return countrys;
};
const getCountry = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const country = await Country_1.default.findById(id);
    if (!country)
        throw new Error("No se ha encontrado el country");
    return country;
};
// Mutations
const createCountry = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newCountry = new Country_1.default(input);
        await newCountry.save();
        return newCountry;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el country: " + error);
    }
};
const updateCountry = async (_, { id, input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const country = await Country_1.default.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!country)
            throw new Error("No se ha encontrado el country");
        return country;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el country: " + error);
    }
};
exports.countryResolvers = {
    Query: {
        getCountrys,
        getCountry,
    },
    Mutation: {
        createCountry,
        updateCountry,
    },
};
