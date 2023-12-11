import Role from "../Models/Role";
import { RoleType } from "../Types/Role";
import { filter } from "../helpers/Filter";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";

interface IRoleInput {
    name: string;
    description: string;
    status: string;
}

// Querys
const getRoles = async (_: any, { input }: { input: IRoleInput }) => {
    const query = filter(input);
    const Roles = await Role.find(query);

    return Roles;
};

const getRole = async (_: any, { id }: { id: string }) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const role: RoleType | null = await Role.findById(id);
    if (!role) throw new Error("No se ha encontrado el rol");
    return role;
};

// Mutations
const createRole = async (
    _: any,
    { input }: { input: IRoleInput },
    { token }: { token: string }
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado un token");
        verifyAdmin(userToken);
        const { name, description } = input;
        const newRole = new Role({ name, description });
        await newRole.save();
        return newRole;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el rol: " + error);
    }
};

const updateRole = async (
    _: any,
    { id, input }: { id: string; input: IRoleInput },
    { token }: { token: string }
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado un token");
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const role = await Role.findByIdAndUpdate(id, input, { new: true });
        if (!role) throw new Error("No se ha encontrado el rol");
        return role;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el rol: " + error);
    }
};

export const roleResolvers = {
    Query: {
        getRoles,
        getRole,
    },
    Mutation: {
        createRole,
        updateRole,
    },
};
