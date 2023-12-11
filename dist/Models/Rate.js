"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rateSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
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
    rate: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Rate', rateSchema);
