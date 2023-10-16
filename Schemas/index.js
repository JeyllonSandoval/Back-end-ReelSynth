import { mergeTypeDefs } from "@graphql-tools/merge";
import fs from "fs";

// Leemos cada uno de los archivos de los Schemas
// const userSchema = fs.readFileSync("./Schemas/user.graphql", "utf8");

const roleSchema = fs.readFileSync("./Schemas/role.graphql", "utf8");
const userSchema = fs.readFileSync("./Schemas/user.graphql", "utf8");
const genrerSchema = fs.readFileSync("./Schemas/genrer.graphql", "utf8");
const movieSchema = fs.readFileSync("./Schemas/movie.graphql", "utf8");
// Unimos todos los Schemas en uno solo
const typeDefs = mergeTypeDefs([roleSchema, genrerSchema , userSchema, movieSchema])
export default typeDefs;