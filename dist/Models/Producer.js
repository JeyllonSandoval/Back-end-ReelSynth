"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const producerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    commentCount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    imgURL: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Producer', producerSchema);
