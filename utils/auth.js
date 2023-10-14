
export const verifyAdmin = (user) => {
    if(!user) throw new Error("No se ha enviado un usuario")

    if(user.role.name !== "Admin") throw new Error("No tienes permisos para realizar esta accion")

    return true
}