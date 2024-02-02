import { ApolloServer, gql } from "apollo-server";

import typeDefs from "./Schemas/index.js";
import resolvers from "./Resolvers/index.js";
import { connectDB } from "./db.js";
// Crea una instancia de Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers["x-token"] || "";
        return { req, token };
    },
});

connectDB();

// Inicia el servidor
server
    .listen({
        port: process.env.PORT || 4000,
    })
    .then(({ url }) => {
        console.log(`Servidor GraphQL listo en ${url}`);
    });
