import { mergeResolvers } from "@graphql-tools/merge";
import { roleResolvers } from "./role.js";
import { userResolvers } from "./user.js";
import { movieResolvers } from "./movie.js";
import { genrerResolvers } from "./genrer.js";	
import { studioResolvers } from "./studio.js";
// Unimos todos los resolvers
const resolvers = mergeResolvers([ 
    roleResolvers, 
    genrerResolvers, 
    studioResolvers, 
    userResolvers, 
    movieResolvers 
]);
// Exportamos los resolvers ya unidos
export default resolvers;