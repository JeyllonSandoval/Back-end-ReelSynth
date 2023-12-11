import Studio from "../Models/Studio";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { filter } from "../helpers/Filter";
import { StudioType } from "../Types/Studio";
import { ContextInput } from "../Types/Context";

interface StudioInput {
    id: string;
    input: StudioType;
}
// Querys
const getStudios = async (_: any, { input }: StudioInput) => {
    const query = filter(input);
    const studios = await Studio.find(query).populate("producer");
    return studios;
};

const getStudio = async (_: any, { id }: StudioInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const studio = await Studio.findById(id).populate("producer");
    if (!studio) throw new Error("No se ha encontrado el Studio: " + id);
    return studio;
};

// Mutations
const createStudio = async (
    _: any,
    { input }: StudioInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newStudio = new Studio(input);
        await newStudio.save();
        return await newStudio.populate("producer");
    } catch (error) {
        throw new Error("Error al crear la Studio: " + error);
    }
};

const updateStudio = async (
    _: any,
    { id, input }: StudioInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const studio = await Studio.findByIdAndUpdate(id, input, {
            new: true,
        }).populate("producer");
        if (!studio) throw new Error("No se ha encontrado la Studio");
        return studio;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Studio: " + error);
    }
};

export const studioResolvers = {
    Query: {
        getStudios,
        getStudio,
    },
    Mutation: {
        createStudio,
        updateStudio,
    },
};
