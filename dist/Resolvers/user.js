"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const Filter_1 = require("../helpers/Filter");
const User_1 = __importDefault(require("../Models/User"));
const Token_1 = require("../utils/Token");
const auth_1 = require("../utils/auth");
const Role_1 = __importDefault(require("../Models/Role"));
const emailer_1 = __importDefault(require("../emailer"));
const index_1 = require("../Mail/index");
// Querys
const getUsers = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const Users = await User_1.default.find(query).populate("role").populate("country");
    return Users;
};
const getUser = async (_, { id }) => {
    if (!id)
        throw new Error("No se ha enviado un ID");
    const user = await User_1.default.findById(id).populate("role").populate("country");
    if (!user)
        throw new Error("No se ha encontrado el Usuario");
    return user;
};
const getUserByToken = async (_, { token }) => {
    if (!token)
        throw new Error("No se ha enviado un Token");
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string") {
        throw new Error("El token no es válido");
    }
    const user = await User_1.default.findById(userToken.id)
        .populate("role")
        .populate("country");
    if (!user)
        throw new Error("No se ha encontrado el Usuario");
    return user;
};
const login = async (_, { input }) => {
    console.log(input);
    const { userName, password, email } = input;
    if (!userName && !email)
        throw new Error("No se ha enviado un nombre de usuario o email");
    if (!password)
        throw new Error("No se ha enviado una contraseña");
    const userFound = await User_1.default.findOne({
        $or: [{ userName: userName }, { email: email }],
    }).populate("role");
    if (!userFound)
        throw new Error("Usuario/Email o contraseña incorrectos");
    const matchPassword = await User_1.default.comparePassword(password, userFound.password);
    if (!matchPassword)
        throw new Error("Usuario/Email o contraseña incorrectos");
    const token = (0, Token_1.createToken)(userFound);
    return { token };
};
const signup = async (_, { input }) => {
    const { userName, password, email } = input;
    if (!userName && !email)
        throw new Error("No se ha enviado un nombre de usuario o email");
    if (!password)
        throw new Error("No se ha enviado una contraseña");
    const userFound = await User_1.default.findOne({
        $or: [{ userName: userName }, { email: email }],
    });
    if (userFound)
        throw new Error("Usuario/Email ya existe");
    const publicRole = await Role_1.default.findOne({ name: "Public" });
    if (!publicRole)
        throw new Error("No se ha encontrado el rol publico");
    const newUser = new User_1.default(input);
    newUser.password = await User_1.default.encryptPassword(password);
    newUser.role = publicRole?.id;
    const user = await newUser.save();
    if (!user)
        throw new Error("No se ha podido crear el usuario");
    const populatedUser = await user.populate("role");
    const token = (0, Token_1.createToken)(populatedUser);
    const html = (0, index_1.htmlWelcome)({ userName: newUser.userName });
    (0, emailer_1.default)({
        to: newUser.email,
        subject: "Bienvenido a ReelSynth",
        html,
    });
    return { token };
};
const createUser = async (_, { input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        (0, auth_1.verifyAdmin)(userToken);
        console.log(userToken);
        if (!input.userName || !input.password || !input.email || !input.role)
            throw new Error("No se ha enviado todos los datos");
        input.password = await User_1.default.encryptPassword(input.password);
        const newUser = new User_1.default(input);
        await newUser.save();
        return await newUser.populate("role country");
    }
    catch (error) {
        throw new Error("El nombre de usuario o email ya existe");
    }
};
const updateUser = async (_, { id, input }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        if (userToken.id !== id)
            (0, auth_1.verifyAdmin)(userToken);
        if (!id)
            throw new Error("No se ha enviado un ID");
        if (input.password)
            input.password = await User_1.default.encryptPassword(input.password);
        const user = await User_1.default.findByIdAndUpdate(id, input, {
            new: true,
        }).populate("role country");
        if (!user)
            throw new Error("No se ha encontrado el Usuario");
        return user;
    }
    catch (error) {
        throw new Error("El nombre de usuario o email ya existe");
    }
};
exports.userResolvers = {
    Query: {
        getUsers,
        getUser,
        getUserByToken,
    },
    Mutation: {
        createUser,
        updateUser,
        login,
        signup,
    },
};
