import { gql } from "apollo-server";

export default gql`

type Episode {
    id: ID!
    title: String!
    description: String
    year: Int
    likeCount: Int
    rating: Float
    season: Season
    status: String
    number: Int
    imgURL: String
    rateCount: Int
    rateTotal: Int
    commentCount: Int
}

input inputEpisode {
    title: String
    description: String
    year: Int
    rating: Float
    imgURL: String
    number: Int
    season: ID
    status: String
}

type Query {
    getEpisodes(input: inputEpisode): [Episode]
    getEpisode(id: ID!): Episode
}

type Mutation {
    createEpisode(input: inputEpisode): Episode
    updateEpisode(id: ID!, input: inputEpisode): Episode
    deleteEpisode(id: ID!): Episode
}

`;

