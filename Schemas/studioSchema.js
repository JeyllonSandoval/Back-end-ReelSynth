import { gql } from "apollo-server";

export default gql`

type Studio {
    id: ID!
    name: String!
    description: String
    imgURL: String
    producer: Producer
    status: String
}

input inputStudio {
    name: String
    description: String
    imgURL: String
    producer: ID
    status: String
}

type Query {
    getStudios(input: inputStudio): [Studio]
    getStudio(id: ID!): Studio
}

type Mutation {
    createStudio(input: inputStudio): Studio
    updateStudio(id: ID!, input: inputStudio): Studio
    deleteStudio(id: ID!): Studio
}


`;
