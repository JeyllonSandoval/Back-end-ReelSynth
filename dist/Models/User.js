"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgURL: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    country: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Country'
    },
    role: {
        ref: "Role",
        type: mongoose_1.Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    console.log("Cifrando contrasena: " + password);
    return await bcryptjs_1.default.hash(password, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcryptjs_1.default.compare(password, receivedPassword);
};
exports.default = (0, mongoose_1.model)('User', userSchema);
