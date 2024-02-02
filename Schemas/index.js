import { mergeTypeDefs } from "@graphql-tools/merge";

import { gql } from "apollo-server";
import commentSchema from "./commentSchemas.js";
import companySchema from "./companySchema.js";
import countrySchema from "./countrySchema.js";
import episodeSchema from "./episodeSchema.js";
import genrerSchema from "./genrerSchema.js";
import hostSchema from "./hostSchema.js";
import likeSchema from "./likeSchema.js";
import movieSchema from "./movieSchema.js";
import producerSchema from "./producerSchema.js";
import rateSchema from "./rateSchema.js";
import roleSchema from "./roleSchema.js";
import seasonSchema from "./seasonSchema.js";
import serieSchema from "./serieSchema.js";
import studioSchema from "./studioSchema.js";
import userSchema from "./userSchema.js";
import videoSchema from "./videoSchema.js";


// Leemos cada uno de los archivos de los Schemas
// const userSchema = fs.readFileSync("./user.graphql", "utf8");


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
    ,
]);
export default typeDefs;
