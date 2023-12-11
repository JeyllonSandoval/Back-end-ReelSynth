import Comment from "../Models/Comment";
import User from "../Models/User";
import { filter } from "../helpers/Filter";
import { verifyAdmin } from "../utils/auth";
import { verifyToken } from "../utils/Token";
import { getModel } from "../helpers/models";
import { ContextInput } from "../Types/Context";
import { CommentType } from "../Types/Comment";

interface CommentInput {
    id: string;
    entityID: string;
    input: CommentType;
}

const updateCounter = async (comment: CommentType) => {
    const { entityID, entityType, status } = comment;

    try {
        const entity = ((await getModel(entityType)) as any).findByIdAndUpdate(
            entityID,
            {
                $inc: {
                    commentCount: status !== "DELETED" ? 1 : -1,
                },
            },
            { new: true }
        );
        return entity;
    } catch (error) {
        console.error("Error updating comment count:", error);
    }
};
// Querys
const getComments = async (_: any, { input }: CommentInput) => {
    console.log(input);
    const query = filter(input);
    const comment = await Comment.find(query)
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

const getComment = async (
    _: any,
    { entityID }: CommentInput,
    { token }: ContextInput
) => {
    const userToken = verifyToken(token);
    if (typeof userToken === "string") throw new Error(userToken);
    const comment = await Comment.findOne({ user: userToken.id, entityID })
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
const createComment = async (
    _: any,
    { input }: CommentInput,
    { token }: ContextInput
) => {
    try {
        if (!input) throw new Error("No se ha enviado el input");
        const userToken = verifyToken(token);
        if (typeof userToken === "string") throw new Error(userToken);
        const newComment: any = new Comment({ ...input, user: userToken.id });
        await newComment.save();

        if (newComment.parent) {
            const parent = await Comment.findById(newComment.parent);

            if (!parent) throw new Error("No se encontro el parent");

            parent.commentCount += 1;

            await parent.save();

            newComment.parent = await parent.populate({
                path: "user",
                populate: {
                    path: "role country",
                },
            });
        }
        newComment.entityID = await (
            getModel(newComment.entityType) as any
        ).findById(newComment.entityID);
        newComment.user = await User.findById(newComment.user).populate({
            path: "role country",
        });

        await updateCounter(newComment);

        return newComment;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el Comment: " + error);
    }
};

const updateComment = async (
    _: any,
    { id, input }: CommentInput,
    { token }: ContextInput
) => {
    // genera este codigo
    const userToken = verifyToken(token);
    if (typeof userToken === "string") throw new Error(userToken);
    const comment = await Comment.findById(id);

    if (!comment) throw new Error("No se encontro el comment");

    if (comment?.user?.toString() !== userToken.id && !verifyAdmin(userToken)) {
        throw new Error("No tienes permisos para actualizar este Comment");
    }

    comment.content = input.content;
    comment.status = "EDITED";
    await comment.save();

    return comment;
};

export const commentResolvers = {
    Query: {
        getComments,
        getComment,
    },
    Mutation: {
        createComment,
        updateComment,
    },
};
