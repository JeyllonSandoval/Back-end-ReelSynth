import Season from "../Models/Season";
import Serie from "../Models/Serie";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { filter } from "../helpers/Filter";
import { SendEmailFollowers } from "../helpers/SendEmailFollowers";
import { ContextInput } from "../Types/Context";
import { SeasonType } from "../Types/Season";

interface SeasonInput {
    id: string;
    input: SeasonType;
}
// Querys
const getSeasons = async (_: any, { input }: SeasonInput) => {
    const query = filter(input);
    const seasons = await Season.find(query).populate({
        path: "serie",
        populate: {
            path: "genrers",
        },
    });

    return seasons;
};

const getSeason = async (_: any, { id }: SeasonInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const season = await Season.findById(id).populate({
        path: "serie",
        populate: {
            path: "genrers",
        },
    });

    if (!season) throw new Error("No se ha encontrado el Season");
    return season;
};

// Mutations
const createSeason = async (
    _: any,
    { input }: SeasonInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newSeason: any = new Season(input);
        await newSeason.save();

        newSeason.serie = await Serie.findByIdAndUpdate(
            newSeason.serie,
            { $inc: { seasons: 1 } },
            { new: true }
        ).populate("genrers");

        SendEmailFollowers({
            entityID: newSeason.serie.id,
        });

        return newSeason;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el Season: " + error);
    }
};

const updateSeason = async (
    _: any,
    { id, input }: SeasonInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const season = await Season.findByIdAndUpdate(id, input, {
            new: true,
        }).populate({
            path: "serie",
            populate: {
                path: "genrers",
            },
        });
        if (!season) throw new Error("No se ha encontrado el Season");
        return season;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Season: " + error);
    }
};

export const seasonResolvers = {
    Query: {
        getSeasons,
        getSeason,
    },
    Mutation: {
        createSeason,
        updateSeason,
    },
};
