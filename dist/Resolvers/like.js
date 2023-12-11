"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeResolvers = void 0;
const Like_1 = __importDefault(require("../Models/Like"));
const Filter_1 = require("../helpers/Filter");
const User_1 = __importDefault(require("../Models/User"));
const Token_1 = require("../utils/Token");
const models_1 = require("../helpers/models");
const updateCounter = async (like) => {
    const { entityID, entityType, liked } = like;
    try {
        const entity = await (0, models_1.getModel)(entityType).findByIdAndUpdate(entityID, {
            $inc: {
                likeCount: liked ? 1 : -1,
            },
        }, { new: true });
        return entity;
    }
    catch (error) {
        console.error("Error updating like count:", error);
    }
};
// Querys
const getLikes = async (_, { input }, { token }) => {
    console.log(input);
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error("El token no es válido");
    const query = (0, Filter_1.filter)(input);
    const likes = await Like_1.default.find({ user: userToken.id, ...query })
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
const getLike = async (_, { entityID }, { token }) => {
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error("El token no es válido");
    const like = await Like_1.default.findOne({ user: userToken.id, entityID })
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
const createLike = async (_, { input }, { token }) => {
    try {
        if (!input)
            throw new Error("No se ha enviado el input");
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        const newLike = new Like_1.default({ ...input, user: userToken.id });
        await newLike.save();
        newLike.entityID = await (0, models_1.getModel)(newLike.entityType).findById(newLike.entityID);
        newLike.user = await User_1.default.findById(newLike.user).populate({
            path: "role country",
        });
        await updateCounter(newLike);
        return newLike;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el Like: " + error);
    }
};
const deleteLike = async (_, { entityID }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("El token no es válido");
        const like = await Like_1.default.findOneAndDelete({
            user: userToken.id,
            entityID,
        }, { new: true })
            .populate({
            path: "entityID",
        })
            .populate({
            path: "user",
            populate: {
                path: "role country",
            },
        });
        if (!like)
            throw new Error("No se ha encontrado el Like");
        like.liked = false;
        await updateCounter(like);
        return like;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Like: " + error);
    }
};
exports.likeResolvers = {
    Query: {
        getLikes,
        getLike,
    },
    Mutation: {
        createLike,
        deleteLike,
    },
};
