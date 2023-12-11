import Serie from "../Models/Serie";
import { verifyToken } from "../utils/Token";
import { verifyAdmin } from "../utils/auth";
import { filter } from "../helpers/Filter";
import { SerieType } from "../Types/Serie";
import { ContextInput } from "../Types/Context";

interface SerieInput {
    id: string;
    input: SerieType | Object;
    top: number;
}

// Querys
const getSeries = async (_: any, { input }: SerieInput) => {
    if (!input) input = {};
    const { producer, ...input2 }: any = input;

    const query = filter(input2);
    const series: any = await Serie.find(query)
        .sort({ createdAt: -1 })
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("genrers")
        .populate({
            path: "studio",
            populate: {
                path: "producer",
            },
        });

    if (producer) {
        return series.filter(
            (serie: SerieType) => serie?.studio?.producer?.id == producer
        );
    }
    return series;
};

const getSerie = async (_: any, { id }: SerieInput) => {
    if (!id) throw new Error("No se ha enviado un ID");
    const serie = await Serie.findById(id)
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("genrers")
        .populate({
            path: "studio",
            populate: {
                path: "producer",
            },
        });
    if (!serie) throw new Error("No se ha encontrado la Serie");
    return serie;
};

const getTopSeries = async (_: any, { input, top }: SerieInput) => {
    if (!input) input = {};
    const { producer, ...input2 }: any = input;

    const query = filter(input2);
    const series: any = await Serie.find(query)
        .sort({ rating: -1, likeCount: -1 })
        .limit(top)
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("genrers")
        .populate({
            path: "studio",
            populate: {
                path: "producer",
            },
        });

    if (producer) {
        return series.filter(
            (serie: SerieType) => serie.studio.producer.id == producer
        );
    }
    return series;
};

// Mutations
const createSerie = async (
    _: any,
    { input }: SerieInput,
    { token }: ContextInput
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        const newSerie = new Serie({ ...input, user: userToken.id });
        await newSerie.save();

        const serie = await Serie.findById(newSerie.id)
            .populate({
                path: "user",
                populate: {
                    path: "role country",
                },
            })
            .populate("genrers")
            .populate({
                path: "studio",
                populate: {
                    path: "producer",
                },
            });

        return serie;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear la Serie: " + error);
    }
};

const updateSerie = async (
    _: any,
    { id, input }: SerieInput,
    { token }: ContextInput
) => {
    try {
        //console.log(id, input)
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        verifyAdmin(userToken);
        if (!id) throw new Error("No se ha enviado un ID");
        const serie = await Serie.findByIdAndUpdate(id, input, { new: true })
            .populate({ path: "user", populate: { path: "role country" } })
            .populate("genrers")
            .populate({ path: "studio", populate: { path: "producer" } });
        if (!serie) throw new Error("No se ha encontrado la Serie");
        return serie;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar la Serie: " + error);
    }
};

export const serieResolvers = {
    Query: {
        getSeries,
        getSerie,
        getTopSeries,
    },
    Mutation: {
        createSerie,
        updateSerie,
    },
};
