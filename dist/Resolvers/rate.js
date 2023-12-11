"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateResolvers = void 0;
const Rate_1 = __importDefault(require("../Models/Rate"));
const Filter_1 = require("../helpers/Filter");
const User_1 = __importDefault(require("../Models/User"));
const Token_1 = require("../utils/Token");
const models_1 = require("../helpers/models");
const updateCounter = async (rating) => {
    const { entityID, entityType, status, rate } = rating;
    try {
        const entity = (await (0, models_1.getModel)(entityType)).findById(entityID);
        entity.rateCount += status !== "DELETED" ? 1 : -1;
        entity.rateTotal += status !== "DELETED" ? rate : -rate;
        entity.rating = entity.rateTotal / entity.rateCount;
        await entity.save();
        return entity;
    }
    catch (error) {
        console.error("Error updating rate count:", error);
    }
};
// Querys
const getRates = async (_, { input }) => {
    console.log(input);
    const query = (0, Filter_1.filter)(input);
    const rates = await Rate_1.default.find(query)
        .populate({
        path: "entityID",
    })
        .populate({
        path: "user",
        populate: {
            path: "role country",
        },
    });
    return rates;
};
const getRate = async (_, { entityID }, { token }) => {
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error(userToken);
    const rate = await Rate_1.default.findOne({ user: userToken.id, entityID })
        .populate({
        path: "entityID",
    })
        .populate({
        path: "user",
        populate: {
            path: "role country",
        },
    });
    return rate;
};
// Mutations
const createRate = async (_, { input }, { token }) => {
    try {
        if (!input)
            throw new Error("No se ha enviado el input");
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        const newRate = new Rate_1.default({ ...input, user: userToken.id });
        await newRate.save();
        newRate.entityID = await (0, models_1.getModel)(newRate.entityType).findById(newRate.entityID);
        newRate.user = await User_1.default.findById(newRate.user).populate({
            path: "role country",
        });
        await updateCounter(newRate);
        return newRate;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al crear el Rate: " + error);
    }
};
const updateRate = async (_, { entityID, rate }, { token }) => {
    // genera este codigo
    const userToken = (0, Token_1.verifyToken)(token);
    if (typeof userToken === "string")
        throw new Error(userToken);
    const rated = await Rate_1.default.findOne({ entityID, user: userToken.id });
    if (!rated)
        throw new Error("No se encontro el rate");
    const rateDiff = rate - rated.rate;
    rated.rate = rate;
    rated.status = "EDITED";
    await rated.save();
    const entity = await (0, models_1.getModel)(rated.entityType).findById(rated.entityID);
    entity.rateTotal += rateDiff;
    entity.rating = entity.rateTotal / entity.rateCount;
    entity.save();
    rated.entityID = entity;
    rated.user = await User_1.default.findById(rated.user).populate({
        path: "role country",
    });
    return rated;
};
const deleteRate = async (_, { entityID }, { token }) => {
    try {
        const userToken = (0, Token_1.verifyToken)(token);
        if (typeof userToken === "string")
            throw new Error(userToken);
        const rate = await Rate_1.default.findOneAndDelete({
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
        if (!rate)
            throw new Error("No se ha encontrado el Rate");
        rate.status = "DELETED";
        updateCounter(rate);
        return rate;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el Rate: " + error);
    }
};
exports.rateResolvers = {
    Query: {
        getRates,
        getRate,
    },
    Mutation: {
        createRate,
        updateRate,
        deleteRate,
    },
};
