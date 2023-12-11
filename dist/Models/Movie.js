"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
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
    year: {
        type: Number,
        required: false
    },
    imgURL: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'ACTIVE'
    },
    duration: {
        type: Number,
        required: false,
        default: 0
    },
    user: {
        ref: 'User',
        type: mongoose_1.Schema.Types.ObjectId
    },
    studio: {
        ref: "Studio",
        type: mongoose_1.Schema.Types.ObjectId
    },
    genrers: [{
            ref: "Genrer",
            type: mongoose_1.Schema.Types.ObjectId
        }],
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
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Movie', movieSchema);
