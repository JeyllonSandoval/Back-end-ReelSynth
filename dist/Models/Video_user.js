"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const video_userSchema = new mongoose_1.Schema({
    video: {
        ref: "Video",
        type: mongoose_1.Schema.Types.ObjectId
    },
    user: {
        ref: "User",
        type: mongoose_1.Schema.Types.ObjectId
    },
    like: {
        type: Number
    },
    time: {
        type: Number
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Video_user', video_userSchema);
