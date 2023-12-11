import { mergeResolvers } from "@graphql-tools/merge";
import { roleResolvers } from "./role";
import { userResolvers } from "./user";
import { movieResolvers } from "./movie";
import { genrerResolvers } from "./genrer";	
import { studioResolvers } from "./studio";
import { producerResolvers } from "./producer";
import { serieResolvers } from "./serie";
import { episodeResolvers } from "./episode";
import { seasonResolvers } from "./season";
import { hostResolvers } from "./host";
import { countryResolvers } from "./country";
import { commentResolvers } from "./comment";
import { likeResolvers } from "./like";
import { rateResolvers } from "./rate";
import { videoResolvers } from "./video";
import { companyResolvers } from "./company";
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
    commentResolvers,
    likeResolvers,
    rateResolvers,
    videoResolvers,
    companyResolvers
]);
// Exportamos los resolvers ya unidos
export default resolvers;