"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const verifyAdmin = (user) => {
    if (!user)
        throw new Error("No se ha enviado un usuario");
    if (user.role.name !== (process.env.ADMIN_NAME || "Admin"))
        throw new Error("No tienes permisos para realizar esta accion");
    return true;
};
exports.verifyAdmin = verifyAdmin;
