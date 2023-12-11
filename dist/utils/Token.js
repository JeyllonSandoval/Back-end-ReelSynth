"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || "";
const createToken = (user) => {
    try {
        const { id, userName, email, role } = user;
        const payload = {
            id,
            userName,
            email,
            role: {
                name: typeof role === "string" ? role : role?.name,
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, {
            expiresIn: "1d",
        });
        return token;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el token: " + error);
    }
};
exports.createToken = createToken;
const verifyToken = (token) => {
    if (!token)
        throw new Error("No se ha enviado un token");
    const tokenInfo = jsonwebtoken_1.default.verify(token, SECRET_KEY);
    if (!tokenInfo)
        throw new Error("Token invalido");
    return tokenInfo;
};
exports.verifyToken = verifyToken;
