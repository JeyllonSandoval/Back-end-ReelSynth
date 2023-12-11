"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    url: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    host: {
        ref: "Host",
        type: mongoose_1.Schema.Types.ObjectId
    },
    entityType: {
        type: String,
        enum: ['Movie', 'Episode'],
        required: true
    },
    entityID: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: 'entityType', // Hace referencia al campo 'entityType'
        required: true
    },
    user: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Video', videoSchema);
