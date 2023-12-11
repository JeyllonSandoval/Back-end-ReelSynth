"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const episodeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    year: {
        type: Number,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    imgURL: {
        type: String
    },
    season: {
        ref: "Season",
        type: mongoose_1.Schema.Types.ObjectId
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
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Episode', episodeSchema);
