import { mergeTypeDefs } from "@graphql-tools/merge";
import fs from "fs";

// Leemos cada uno de los archivos de los Schemas
// const userSchema = fs.readFileSync("./src/Schemas/user.graphql", "utf8");

const roleSchema = fs.readFileSync("./src/Schemas/role.graphql", "utf8");
const userSchema = fs.readFileSync("./src/Schemas/user.graphql", "utf8");
const genrerSchema = fs.readFileSync("./src/Schemas/genrer.graphql", "utf8");
const movieSchema = fs.readFileSync("./src/Schemas/movie.graphql", "utf8");
const studioSchema = fs.readFileSync("./src/Schemas/studio.graphql", "utf8");
const producerSchema = fs.readFileSync(
    "./src/Schemas/producer.graphql",
    "utf8"
);
const serieSchema = fs.readFileSync("./src/Schemas/serie.graphql", "utf8");
const seasonSchema = fs.readFileSync("./src/Schemas/season.graphql", "utf8");
const episodeSchema = fs.readFileSync("./src/Schemas/episode.graphql", "utf8");
const hostSchema = fs.readFileSync("./src/Schemas/host.graphql", "utf8");
const countrySchema = fs.readFileSync("./src/Schemas/country.graphql", "utf8");
const commentSchema = fs.readFileSync("./src/Schemas/comment.graphql", "utf8");
const likeSchema = fs.readFileSync("./src/Schemas/like.graphql", "utf8");
const rateSchema = fs.readFileSync("./src/Schemas/rate.graphql", "utf8");
const videoSchema = fs.readFileSync("./src/Schemas/video.graphql", "utf8");
const companySchema = fs.readFileSync("./src/Schemas/company.graphql", "utf8");
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
    videoSchema,
    companySchema,
]);
export default typeDefs;
