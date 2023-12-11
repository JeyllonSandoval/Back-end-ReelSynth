import Like from "../Models/Like";
import { filter } from "../helpers/Filter";
import User from "../Models/User";
import { verifyToken } from "../utils/Token";
import { getModel } from "../helpers/models";
import { LikeType } from "../Types/Like";

const updateCounter = async (like: LikeType) => {
    const { entityID, entityType, liked } = like;

    try {
        const entity = await (getModel(entityType) as any).findByIdAndUpdate(
            entityID,
            {
                $inc: {
                    likeCount: liked ? 1 : -1,
                },
            },
            { new: true }
        );
        return entity;
    } catch (error) {
        console.error("Error updating like count:", error);
    }
};

// Querys
const getLikes = async (
    _: any,
    { input }: { input: LikeType },
    { token }: { token: string }
) => {
    console.log(input);

    const userToken = verifyToken(token);
    if (typeof userToken === "string") throw new Error("El token no es válido");

    const query = filter(input);
    const likes = await Like.find({ user: userToken.id, ...query })
        .populate({
            path: "entityID",
            populate: {
                path: "genrers",
            },
        })
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        })
        .sort({ updatedAt: -1 });

    return likes;
};

const getLike = async (
    _: any,
    { entityID }: { entityID: string },
    { token }: { token: string }
) => {
    const userToken = verifyToken(token);
    if (typeof userToken === "string") throw new Error("El token no es válido");
    const like = await Like.findOne({ user: userToken.id, entityID })
        .populate({
            path: "entityID",
        })
        .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        });

    return like;
};

// Mutations
const createLike = async (
    _: any,
    { input }: { input: LikeType },
    { token }: { token: string }
) => {
    try {
        if (!input) throw new Error("No se ha enviado el input");
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        const newLike: any = new Like({ ...input, user: userToken.id });
        await newLike.save();

        newLike.entityID = await (getModel(newLike.entityType) as any).findById(
            newLike.entityID
        );

        newLike.user = await User.findById(newLike.user).populate({
            path: "role country",
        });

        await updateCounter(newLike);

        return newLike;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el Like: " + error);
    }
};

const deleteLike = async (
    _: any,
    { entityID }: { entityID: string },
    { token }: { token: string }
) => {
    try {
        const userToken = verifyToken(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        const like: any = await Like.findOneAndDelete(
            {
                user: userToken.id,
                entityID,
            },
            { new: true }
        )
            .populate({
                path: "entityID",
            })
            .populate({
                path: "user",
                populate: {
                    path: "role country",
                },
            });
        if (!like) throw new Error("No se ha encontrado el Like");
        like.liked = false;
        await updateCounter(like);
        return like;
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Like: " + error);
    }
};

export const likeResolvers = {
    Query: {
        getLikes,
        getLike,
    },
    Mutation: {
        createLike,
        deleteLike,
    },
};
