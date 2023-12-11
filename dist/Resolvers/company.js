"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyResolvers = void 0;
const Company_1 = __importDefault(require("../Models/Company"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Filter_1 = require("../helpers/Filter");
// Querys
const getCompanys = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const companys = await Company_1.default.find(query);
    return companys;
};
const getCompany = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const company = await Company_1.default.findById(id);
    if (!Company_1.default)
        throw new Error("No se ha encontrado la Company");
    return company;
};
// Mutations
const createCompany = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        const newCompany = new Company_1.default(input);
        await newCompany.save();
        return newCompany;
    }
    catch (error) {
        throw new Error("Error al crear la Company: " + error);
    }
};
const updateCompany = async (_, { id, input }, { token }) => {
    try {
        //console.log(id, input)
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const company = await Company_1.default.findByIdAndUpdate(id, input, {
            new: true,
        });
        if (!company)
            throw new Error("No se ha encontrado la Company");
        return company;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Company: " + error);
    }
};
exports.companyResolvers = {
    Query: {
        getCompanys,
        getCompany,
    },
    Mutation: {
        createCompany,
        updateCompany,
    },
};
