"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoResolvers = void 0;
const Video_1 = __importDefault(require("../Models/Video"));
const Filter_1 = require("../helpers/Filter");
const User_1 = __importDefault(require("../Models/User"));
const auth_1 = require("../utils/auth");
const Token_1 = require("../utils/Token");
const models_1 = require("../helpers/models");
const Host_1 = __importDefault(require("../Models/Host"));
// Querys
const getVideos = async (_, { input }) => {
    const query = (0, Filter_1.filter)(input);
    const videos = await Video_1.default.find(query)
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
const getVideo = async (_, { id }) => {
    const video = await Video_1.default.findById(id)
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
const createVideo = async (_, { input }, { token }) => {
    try {
        if (!input)
            throw new Error("No se ha enviado el input");
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado el token");
        (0, auth_1.verifyAdmin)(userToken);
        const newVideo = new Video_1.default({ ...input, user: userToken.id });
        await newVideo.save();
        newVideo.entityID = await (0, models_1.getModel)(newVideo.entityType).findById(newVideo.entityID);
        newVideo.user = await User_1.default.findById(newVideo.user).populate({
            path: "role country",
        });
        newVideo.host = await Host_1.default.findById(newVideo.host);
        return newVideo;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el Video: " + error);
    }
};
const updateVideo = async (_, { id, input }, { token }) => {
    // genera este codigo
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error("El token no es válido");
    (0, auth_1.verifyAdmin)(userToken);
    const video = await Video_1.default.findByIdAndUpdate(id, input, { new: true });
    if (!video)
        throw new Error("No se encontro el video");
    const entity = await (0, models_1.getModel)(video.entityType).findById(video.entityID);
    video.entityID = entity;
    video.user = await User_1.default.findById(video.user).populate({
        path: "role country",
    });
    video.host = await Host_1.default.findById(video.host);
    return video;
};
const deleteVideo = async (_, { id }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error("No se ha enviado el token");
        (0, auth_1.verifyAdmin)(userToken);
        const video = await Video_1.default.findByIdAndDelete(id)
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
        if (!video)
            throw new Error("No se ha encontrado el Video");
        video.status = "DELETED";
        return video;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Video: " + error);
    }
};
exports.videoResolvers = {
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
