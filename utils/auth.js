import { ADMIN_NAME } from "../config.js";
export const verifyAdmin = (user) => {
    if (!user) throw new Error("No se ha enviado un usuario");

    if (user.role.name !== ADMIN_NAME)
        throw new Error("No tienes permisos para realizar esta accion");

    return true;
};
