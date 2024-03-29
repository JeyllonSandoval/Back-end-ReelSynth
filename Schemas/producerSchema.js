import { gql } from "apollo-server";

export default gql`

type Producer {
    id: ID!
    name: String!
    description: String
    imgURL: String
    status: String
}

input inputProducer {
    name: String!
    description: String
    imgURL: String
    status: String
}

type Query {
    getProducers(input: inputProducer): [Producer]
    getProducer(id: ID!): Producer
}

type Mutation {
    createProducer(input: inputProducer): Producer
    updateProducer(id: ID!, input: inputProducer): Producer
    deleteProducer(id: ID!): Producer
}

`;

