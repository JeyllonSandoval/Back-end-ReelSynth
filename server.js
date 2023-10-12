import { ApolloServer, gql } from "apollo-server"

const peliculas = [
    {
      titulo: "Pelicula 1",
      descripcion: "Descripción de la Película 1"
    },
    {
      titulo: "Pelicula 2",
      descripcion: "Descripción de la Película 2"
    },
    {
      titulo: "Pelicula 3",
      descripcion: "Descripción de la Película 3"
    }
  ];

// Define tu esquema GraphQL
const typeDefs = gql`
type pelicula {
    titulo: String
    descripcion: String
}  
type Query {
    hello: String
    get_movies: [pelicula]
}
`;

// Resolvers para tu esquema
const resolvers = {
    Query: {
        hello: () => 'Hola, mundo!',
        get_movies: () => peliculas
    },
};

// Crea una instancia de Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Inicia el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL listo en ${url}`);
});