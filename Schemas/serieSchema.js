import { gql } from "apollo-server";

export default gql`

type Serie {
    id: ID!
    title: String!
    description: String
    rating: Float
    studio: Studio
    likeCount: Int
    user: User
    genrers: [Genrer]
    seasons: Int
    status: String
    commentCount: Int
    imgURL: String
    year: Int
}

input inputSerie {
    title: String
    description: String
    rating: Float
    studio: ID
    status: String
    seasons: Int
    genrers: [ID]
    producer: ID
    user: ID
    imgURL: String
    year: Int
}

type Query {
    getSeries(input: inputSerie): [Serie]
    getSerie(id: ID!): Serie
    getTopSeries(input: inputSerie, top: Int!): [Serie]
}

type Mutation {
    createSerie(input: inputSerie): Serie
    updateSerie(id: ID!, input: inputSerie): Serie
    deleteSerie(id: ID!): Serie
}

`;

