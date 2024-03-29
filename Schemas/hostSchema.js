import { gql } from "apollo-server";

export default gql`

type Host {
    id: ID!
    name: String!
    description: String
    status: String
}

input inputHost {
    name: String!
    description: String
    status: String
}

type Query {
    getHosts(input: inputHost): [Host]
    getHost(id: ID!): Host
}

type Mutation {
    createHost(input: inputHost): Host
    updateHost(id: ID!, input: inputHost): Host
    deleteHost(id: ID!): Host
}

`;

