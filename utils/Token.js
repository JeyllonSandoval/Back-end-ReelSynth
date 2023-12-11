import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
export const createToken = (user) => {
    try {
        const { id, userName, email, role } = user;
        const payload = {
            id,
            userName,
            email,
            role: {
                name: role.name,
            },
        };
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "1d",
        });
        return token;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el token: " + error.message || error);
    }
};

export const verifyToken = (token) => {
    if (!token) throw new Error("No se ha enviado un token");
    const tokenInfo = jwt.verify(token, SECRET_KEY);
    if (!tokenInfo) throw new Error("Token invalido");
    return tokenInfo;
};
