"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleResolvers = void 0;
const Role_1 = __importDefault(require("../Models/Role"));
const Filter_1 = require("../helpers/Filter");
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
// Querys
const getRoles = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const Roles = await Role_1.default.find(query);
    return Roles;
};
const getRole = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const role = await Role_1.default.findById(id);
    if (!role)
        throw new Error("No se ha encontrado el rol");
    return role;
};
// Mutations
const createRole = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado un token");
        (0, auth_1.verifyAdmin)(userToken);
        const { name, description } = input;
        const newRole = new Role_1.default({ name, description });
        await newRole.save();
        return newRole;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el rol: " + error);
    }
};
const updateRole = async (_, { id, input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado un token");
        (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        const role = await Role_1.default.findByIdAndUpdate(id, input, { new: true });
        if (!role)
            throw new Error("No se ha encontrado el rol");
        return role;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el rol: " + error);
    }
};
exports.roleResolvers = {
    Query: {
        getRoles,
        getRole,
    },
    Mutation: {
        createRole,
        updateRole,
    },
};
