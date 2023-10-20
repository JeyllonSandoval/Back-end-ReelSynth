import { mergeTypeDefs } from "@graphql-tools/merge";
import fs from "fs";

// Leemos cada uno de los archivos de los Schemas
// const userSchema = fs.readFileSync("./Schemas/user.graphql", "utf8");

const roleSchema = fs.readFileSync("./Schemas/role.graphql", "utf8");
const userSchema = fs.readFileSync("./Schemas/user.graphql", "utf8");
const genrerSchema = fs.readFileSync("./Schemas/genrer.graphql", "utf8");
const movieSchema = fs.readFileSync("./Schemas/movie.graphql", "utf8");
const studioSchema = fs.readFileSync("./Schemas/studio.graphql", "utf8");
const producerSchema = fs.readFileSync("./Schemas/producer.graphql", "utf8");
const serieSchema = fs.readFileSync("./Schemas/serie.graphql", "utf8");
const seasonSchema = fs.readFileSync("./Schemas/season.graphql", "utf8");
const episodeSchema = fs.readFileSync("./Schemas/episode.graphql", "utf8");
const hostSchema = fs.readFileSync("./Schemas/host.graphql", "utf8");
const countrySchema = fs.readFileSync("./Schemas/country.graphql", "utf8");
const commentSchema = fs.readFileSync("./Schemas/comment.graphql", "utf8");
const likeSchema = fs.readFileSync("./Schemas/like.graphql", "utf8");
const rateSchema = fs.readFileSync("./Schemas/rate.graphql", "utf8");
const videoSchema = fs.readFileSync("./Schemas/video.graphql", "utf8");
// Unimos todos los Schemas en uno solo
const typeDefs = mergeTypeDefs([
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
    videoSchema
])
export default typeDefs;