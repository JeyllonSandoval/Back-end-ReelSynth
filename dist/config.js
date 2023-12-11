"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_USER = exports.REFRESH_TOKEN = exports.REDIRECT_URI = exports.CLIENT_SECRET = exports.CLIENT_ID = exports.ADMIN_NAME = exports.PORT = exports.SECRET_KEY = exports.MONGO_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URL = process.env.MONGO_URL || "";
exports.SECRET_KEY = process.env.SECRET_KEY || "";
exports.PORT = process.env.PORT || 3000;
exports.ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
exports.CLIENT_ID = process.env.CLIENT_ID || "";
exports.CLIENT_SECRET = process.env.CLIENT_SECRET || "";
exports.REDIRECT_URI = process.env.REDIRECT_URI || "";
exports.REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";
exports.PUBLIC_USER = process.env.PUBLIC_USER || "Public";
