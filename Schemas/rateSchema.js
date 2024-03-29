import { gql } from "apollo-server";

export default gql`

type Rate {
    id: ID!
    rate: Float
    entityID: entityID
    entityType: String
    user: User
    createdAt: String
    updatedAt: String
    status: String
}
    
input inputRate {
    rate: Float
    entityType: String
    entityID: ID
}

type Query {
    getRates(input: inputRate): [Rate]
    getRate(entityID: ID!): Rate
}

type Mutation {
    createRate(input: inputRate): Rate
    updateRate(entityID: ID!, rate: Float): Rate
    deleteRate(entityID: ID!): Rate
}


`;
