"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    seasons: {
        type: Number,
        default: 0
    },
    studio: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Studio'
    },
    genrers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Genrer'
        }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    likeCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    rateCount: {
        type: Number,
        default: 0
    },
    rateTotal: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    imgURL: {
        type: String,
        trim: true
    },
    year: {
        type: Number,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Serie', serieSchema);
