"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genrerSchema = new mongoose_1.Schema({
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
    status: {
        type: String,
        default: 'ACTIVE'
    },
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Genrer', genrerSchema);
