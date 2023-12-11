import Genrer from "../Models/Genrer";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { GenrerType } from "../Types/Genrer";
import { ContextInput } from "../Types/Context";

interface GenrerInput {
    id: string;
    input: GenrerType;
}
// Querys
const getGenrers = async (_: any, { input }: GenrerInput) => {
    const genrers = await Genrer.find(input);
    return genrers;
};

const getGenrer = async (_: any, { id }: GenrerInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const genrer = await Genrer.findById(id);
    if (!genrer) throw new Error("No se ha encontrado la Genrer");
    return genrer;
};

// Mutations
const createGenrer = async (
    _: any,
    { input }: GenrerInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newGenrer = new Genrer(input);
        await newGenrer.save();
        return newGenrer;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la Genrer: " + error);
    }
};

const updateGenrer = async (
    _: any,
    { id, input }: GenrerInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const genrer = await Genrer.findByIdAndUpdate(id, input, { new: true });
        if (!genrer) throw new Error("No se ha encontrado la Genrer");
        return genrer;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Genrer: " + error);
    }
};

export const genrerResolvers = {
    Query: {
        getGenrers,
        getGenrer,
    },
    Mutation: {
        createGenrer,
        updateGenrer,
    },
};
