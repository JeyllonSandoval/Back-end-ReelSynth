"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seasonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        trim: true
    },
    commentCount: {
        type: Number,
        default: 0
    },
    serie: {
        ref: "Serie",
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
    episodesCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Season', seasonSchema);
