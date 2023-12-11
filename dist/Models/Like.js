"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entityType: {
        type: String,
        enum: ['Movie', 'Season', 'Serie', 'Episode', 'Comment'],
        required: true
    },
    entityID: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: 'entityType', // Hace referencia al campo 'entityType'
        required: true
    },
    liked: {
        type: Boolean,
        required: true,
        default: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Like', likeSchema);
