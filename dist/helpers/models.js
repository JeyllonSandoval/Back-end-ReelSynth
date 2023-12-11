"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModel = void 0;
const Movie_1 = __importDefault(require("../Models/Movie"));
const Season_1 = __importDefault(require("../Models/Season"));
const Serie_1 = __importDefault(require("../Models/Serie"));
const Episode_1 = __importDefault(require("../Models/Episode"));
const Comment_1 = __importDefault(require("../Models/Comment"));
const getModel = (entityType) => {
    switch (entityType) {
        case 'Movie':
            return Movie_1.default;
        case 'Season':
            return Season_1.default;
        case 'Episode':
            return Episode_1.default;
        case 'Serie':
            return Serie_1.default;
        case 'Comment':
            return Comment_1.default;
        default:
            throw new Error('Invalid entity type.');
    }
};
exports.getModel = getModel;
