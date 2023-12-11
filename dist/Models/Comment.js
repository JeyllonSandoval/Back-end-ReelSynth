"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        enum: ['Movie', 'Season', 'Serie', 'Episode'],
        required: true
    },
    entityID: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: 'entityType', // Hace referencia al campo 'entityType'
        required: true
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    commentCount: {
        type: Number,
        default: 0
    },
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
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Comment', commentSchema);
