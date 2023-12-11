"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResolvers = void 0;
const Comment_1 = __importDefault(require("../Models/Comment"));
const User_1 = __importDefault(require("../Models/User"));
const Filter_1 = require("../helpers/Filter");
const auth_1 = require("../utils/auth");
const Token_1 = require("../utils/Token");
const models_1 = require("../helpers/models");
const updateCounter = async (comment) => {
    const { entityID, entityType, status } = comment;
    try {
        const entity = (await (0, models_1.getModel)(entityType)).findByIdAndUpdate(entityID, {
            $inc: {
                commentCount: status !== "DELETED" ? 1 : -1,
            },
        }, { new: true });
        return entity;
    }
    catch (error) {
        console.error("Error updating comment count:", error);
    }
};
// Querys
const getComments = async (_, { input }) => {
    console.log(input);
    const query = (0, Filter_1.filter)(input);
    const comment = await Comment_1.default.find(query)
        .populate({
        path: "entityID",
    })
        .populate({
        path: "user",
        populate: {
            path: "role country",
        },
    })
        .populate({
        path: "parent",
        populate: {
            path: "user",
        },
        strictPopulate: false,
    });
    return comment;
};
const getComment = async (_, { entityID }, { token }) => {
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error(userToken);
    const comment = await Comment_1.default.findOne({ user: userToken.id, entityID })
        .populate({
        path: "entityID",
    })
        .populate({
        path: "user",
        populate: {
            path: "role country",
        },
    })
        .populate({
        path: "parent",
        populate: {
            path: "user",
        },
        strictPopulate: false,
    });
    return comment;
};
// Mutations
const createComment = async (_, { input }, { token }) => {
    try {
        if (!input)
            throw new Error("No se ha enviado el input");
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        const newComment = new Comment_1.default({ ...input, user: userToken.id });
        await newComment.save();
        if (newComment.parent) {
            const parent = await Comment_1.default.findById(newComment.parent);
            if (!parent)
                throw new Error("No se encontro el parent");
            parent.commentCount += 1;
            await parent.save();
            newComment.parent = await parent.populate({
                path: "user",
                populate: {
                    path: "role country",
                },
            });
        }
        newComment.entityID = await (0, models_1.getModel)(newComment.entityType).findById(newComment.entityID);
        newComment.user = await User_1.default.findById(newComment.user).populate({
            path: "role country",
        });
        await updateCounter(newComment);
        return newComment;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el Comment: " + error);
    }
};
const updateComment = async (_, { id, input }, { token }) => {
    // genera este codigo
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error(userToken);
    const comment = await Comment_1.default.findById(id);
    if (!comment)
        throw new Error("No se encontro el comment");
    if (comment?.user?.toString() !== userToken.id && !(0, auth_1.verifyAdmin)(userToken)) {
        throw new Error("No tienes permisos para actualizar este Comment");
    }
    comment.content = input.content;
    comment.status = "EDITED";
    await comment.save();
    return comment;
};
exports.commentResolvers = {
    Query: {
        getComments,
        getComment,
    },
    Mutation: {
        createComment,
        updateComment,
    },
};
