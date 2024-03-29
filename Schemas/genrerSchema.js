import { gql } from "apollo-server";

export default gql`

type Genrer {
    id: ID!
    name: String!
    description: String
    status: String
}

input inputGenrer {
    name: String!
    description: String
    status: String
}

type Query {
    getGenrers(input: inputGenrer): [Genrer]
    getGenrer(id: ID!): Genrer
}

type Mutation {
    createGenrer(input: inputGenrer): Genrer
    updateGenrer(id: ID!, input: inputGenrer): Genrer
    deleteGenrer(id: ID!): Genrer
}

`;

