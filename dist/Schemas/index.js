"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const fs_1 = __importDefault(require("fs"));
// Leemos cada uno de los archivos de los Schemas
// const userSchema = fs.readFileSync("./src/Schemas/user.graphql", "utf8");
const roleSchema = fs_1.default.readFileSync("./src/Schemas/role.graphql", "utf8");
const userSchema = fs_1.default.readFileSync("./src/Schemas/user.graphql", "utf8");
const genrerSchema = fs_1.default.readFileSync("./src/Schemas/genrer.graphql", "utf8");
const movieSchema = fs_1.default.readFileSync("./src/Schemas/movie.graphql", "utf8");
const studioSchema = fs_1.default.readFileSync("./src/Schemas/studio.graphql", "utf8");
const producerSchema = fs_1.default.readFileSync("./src/Schemas/producer.graphql", "utf8");
const serieSchema = fs_1.default.readFileSync("./src/Schemas/serie.graphql", "utf8");
const seasonSchema = fs_1.default.readFileSync("./src/Schemas/season.graphql", "utf8");
const episodeSchema = fs_1.default.readFileSync("./src/Schemas/episode.graphql", "utf8");
const hostSchema = fs_1.default.readFileSync("./src/Schemas/host.graphql", "utf8");
const countrySchema = fs_1.default.readFileSync("./src/Schemas/country.graphql", "utf8");
const commentSchema = fs_1.default.readFileSync("./src/Schemas/comment.graphql", "utf8");
const likeSchema = fs_1.default.readFileSync("./src/Schemas/like.graphql", "utf8");
const rateSchema = fs_1.default.readFileSync("./src/Schemas/rate.graphql", "utf8");
const videoSchema = fs_1.default.readFileSync("./src/Schemas/video.graphql", "utf8");
const companySchema = fs_1.default.readFileSync("./src/Schemas/company.graphql", "utf8");
// Unimos todos los Schemas en uno solo
const typeDefs = (0, merge_1.mergeTypeDefs)([
    roleSchema,
    countrySchema,
    hostSchema,
    genrerSchema,
    producerSchema,
    studioSchema,
    userSchema,
    movieSchema,
    serieSchema,
    seasonSchema,
    episodeSchema,
    commentSchema,
    likeSchema,
    rateSchema,
    videoSchema,
    companySchema,
]);
exports.default = typeDefs;
