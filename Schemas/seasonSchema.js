import { gql } from "apollo-server";

export default gql`

type Season {
    id: ID!
    title: String!
    description: String
    number: Int
    serie: Serie
    likeCount: Int
    status: String
    episodesCount: Int
}

input inputSeason {
    title: String
    description: String
    number: Int
    serie: ID
    status: String
}

type Query {
    getSeasons(input: inputSeason): [Season]
    getSeason(id: ID!): Season
}

type Mutation {
    createSeason(input: inputSeason): Season
    updateSeason(id: ID!, input: inputSeason): Season
    deleteSeason(id: ID!): Season
}

`;

