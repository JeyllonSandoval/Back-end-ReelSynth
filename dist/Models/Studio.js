"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    producer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Producer'
    },
    imgURL: {
        type: String,
        trim: true
    },
    likeCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Studio', studioSchema);
