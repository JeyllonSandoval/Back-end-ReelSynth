import { mergeResolvers } from "@graphql-tools/merge";
import { roleResolvers } from "./role.js";
import { userResolvers } from "./user.js";
import { movieResolvers } from "./movie.js";
import { genrerResolvers } from "./genrer.js";	
import { studioResolvers } from "./studio.js";
import { producerResolvers } from "./producer.js";
import { serieResolvers } from "./serie.js";
import { episodeResolvers } from "./episode.js";
import { seasonResolvers } from "./season.js";
import { hostResolvers } from "./host.js";
import { countryResolvers } from "./country.js";
import { commentResolvers } from "./comment.js";
// Unimos todos los resolvers
const resolvers = mergeResolvers([ 
    roleResolvers, 
    genrerResolvers,
    countryResolvers,
    hostResolvers, 
    producerResolvers,
    studioResolvers, 
    userResolvers, 
    movieResolvers,
    serieResolvers,
    seasonResolvers,
    episodeResolvers,
    commentResolvers
]);
// Exportamos los resolvers ya unidos
export default resolvers;