import Episode from "../Models/Episode";
import { filter } from "../helpers/Filter";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import Season from "../Models/Season";
import { SendEmailFollowersEpisode } from "../helpers/SendEmailFollowers";
import { ContextInput } from "../Types/Context";
import { EpisodeType } from "../Types/Episode";

interface EpisodeInput {
    id: string;
    input: EpisodeType;
}
// Querys
const getEpisodes = async (_: any, { input }: EpisodeInput) => {
    const query = filter(input);
    const episodes = await Episode.find(query).populate({
        path: "season",
        populate: {
            path: "serie",
        },
    });
    return episodes;
};

const getEpisode = async (_: any, { id }: EpisodeInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const episode: any = await Episode.findById(id).populate({
        path: "season",
        populate: {
            path: "serie",
        },
    });

    SendEmailFollowersEpisode(
        {
            entityID: episode.season.serie.id,
        },
        episode.number,
        episode.season.number
    );

    if (!episode) throw new Error("No se ha encontrado la Episode");
    return episode;
};

// Mutations
const createEpisode = async (
    _: any,
    { input }: EpisodeInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);

        const newEpisode: any = new Episode(input);

        await newEpisode.save();

        newEpisode.season = await Season.findByIdAndUpdate(
            newEpisode.season,
            { $inc: { episodesCount: 1 } },
            { new: true }
        ).populate({
            path: "serie",
        });

        SendEmailFollowersEpisode(
            {
                entityID: newEpisode.season.serie.id,
            },
            newEpisode.number,
            newEpisode.season.number
        );

        return newEpisode;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la Episode: " + error);
    }
};

const updateEpisode = async (
    _: any,
    { id, input }: EpisodeInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const episode = await Episode.findByIdAndUpdate(id, input, {
            new: true,
        }).populate({
            path: "season",
            populate: {
                path: "serie",
            },
        });
        if (!episode) throw new Error("No se ha encontrado la Episode");
        return episode;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Episode: " + error);
    }
};

export const episodeResolvers = {
    Query: {
        getEpisodes,
        getEpisode,
    },
    Mutation: {
        createEpisode,
        updateEpisode,
    },
};
