import { ApolloServer, gql } from "apollo-server"

import typeDefs from "./Schemas/index.js"
import resolvers from "./Resolvers/index.js"
import {connectDB} from "./db.js"
import dotenv from 'dotenv';
dotenv.config( { path: './.env' } );
// Crea una instancia de Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

connectDB()

// Inicia el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL listo en ${url}`);
});