import jwt from "jsonwebtoken";

import { UserType } from "../Types/User";

const SECRET_KEY = process.env.SECRET_KEY || "";

export const createToken = (user: UserType) => {
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
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "1d",
        });
        return token;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el token: " + error);
    }
};

export const verifyToken = (token: string) => {
    if (!token) throw new Error("No se ha enviado un token");
    const tokenInfo = jwt.verify(token, SECRET_KEY);
    if (!tokenInfo) throw new Error("Token invalido");
    return tokenInfo;
};
