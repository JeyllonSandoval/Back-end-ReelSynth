import { gql } from "apollo-server";

export default gql`

type Country{
    id: ID!
    name: String!
    lenguage: String
    createdAt: String
    updatedAt: String
}

input CountryInput{
    name: String
    lenguage: String
}

type Query{ 
    getCountrys(input: CountryInput): [Country]
    getCountry(id: ID!): Country
}

type Mutation{
    createCountry(input: CountryInput!): Country
    updateCountry(id: ID!, input: CountryInput): Country
    deleteCountry(id: ID!): Country
}

`;

