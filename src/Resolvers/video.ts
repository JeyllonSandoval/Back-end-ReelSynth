import Video from "../Models/Video";
import { filter } from "../helpers/Filter";
import User from "../Models/User";
import { verifyAdmin } from "../utils/auth";
import { verifyToken } from "../utils/Token";
import { getModel } from "../helpers/models";
import Host from "../Models/Host";
import { ContextInput } from "../Types/Context";

interface VideoInput {
    name: string;
    description: string;
    url: string;
    status: string;
    entityType: string;
    entityID: string;
    host: string;
}

interface Video {
    id: string;
    input: VideoInput;
}
// Querys
const getVideos = async (_: any, { input }: Video) => {
    const query = filter(input);
    const videos = await Video.find(query)
        .populate({
            path: "entityID",
        })
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("host");

    return videos;
};

const getVideo = async (_: any, { id }: Video) => {
    const video = await Video.findById(id)
        .populate({
            path: "entityID",
        })
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .populate("host");

    return video;
};

// Mutations
const createVideo = async (
    _: any,
    { input }: Video,
    { token }: ContextInput
) => {
    try {
        if (!input) throw new Error("No se ha enviado el input");
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado el token");
        verifyAdmin(userToken);
        const newVideo: any = new Video({ ...input, user: userToken.id });
        await newVideo.save();

        newVideo.entityID = await (
            getModel(newVideo.entityType) as any
        ).findById(newVideo.entityID);
        newVideo.user = await User.findById(newVideo.user).populate({
            path: "role country",
        });

        newVideo.host = await Host.findById(newVideo.host);

        return newVideo;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el Video: " + error);
    }
};

const updateVideo = async (
    _: any,
    { id, input }: Video,
    { token }: ContextInput
) => {
    // genera este codigo
    const userToken = verifyToken(token);
    if (typeof userToken === "string") throw new Error("El token no es válido");
    verifyAdmin(userToken);

    const video: any = await Video.findByIdAndUpdate(id, input, { new: true });
    if (!video) throw new Error("No se encontro el video");

    const entity = await (getModel(video.entityType) as any).findById(
        video.entityID
    );

    video.entityID = entity;

    video.user = await User.findById(video.user).populate({
        path: "role country",
    });

    video.host = await Host.findById(video.host);

    return video;
};

const deleteVideo = async (_: any, { id }: Video, { token }: ContextInput) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado el token");
        verifyAdmin(userToken);
        const video = await Video.findByIdAndDelete(id)
            .populate({
                path: "entityID",
            })
            .populate({
                path: "user",
                populate: {
                    path: "role country",
                },
            })
            .populate("host");
        if (!video) throw new Error("No se ha encontrado el Video");
        video.status = "DELETED";
        return video;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Video: " + error);
    }
};

export const videoResolvers = {
    Query: {
        getVideos,
        getVideo,
    },
    Mutation: {
        createVideo,
        updateVideo,
        deleteVideo,
    },
};
