import { mergeResolvers } from "@graphql-tools/merge";
import { roleResolvers } from "./role.js";
import { userResolvers } from "./user.js";
// Unimos todos los resolvers
const resolvers = mergeResolvers([ roleResolvers, userResolvers ]);
// Exportamos los resolvers ya unidos
export default resolvers;