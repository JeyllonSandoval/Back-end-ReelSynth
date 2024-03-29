import { gql } from "apollo-server";

export default gql`

type Company {
    id: ID!
    imgURL: String
    name: String!
    description: String
    status: String
}

input inputCompany {
    imgURL: String
    name: String!
    description: String
    status: String
}

type Query {
    getCompanys(input: inputCompany): [Company]
    getCompany(id: ID!): Company
}

type Mutation {
    createCompany(input: inputCompany): Company
    updateCompany(id: ID!, input: inputCompany): Company
    deleteCompany(id: ID!): Company
}

`;

