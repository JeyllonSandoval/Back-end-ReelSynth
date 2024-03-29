import { gql } from "apollo-server";

export default gql`

type Movie {
    id: ID!
    title: String!
    description: String
    year: Int
    rating: Float
    imgURL: String
    duration: Int
    user: User
    likeCount: Int
    commentCount: Int
    rateCount: Int
    rateTotal: Int
    studio: Studio
    genrers: [Genrer]
    status: String
}

input inputMovie {
    title: String
    description: String
    year: Int
    rating: Float
    imgURL: String
    duration: Int
    status: String
    studio: ID
    genrers: [ID]
    user: ID
    producer: ID
    movie: ID
}

type Query {
    getMovies(input: inputMovie): [Movie]
    getMovie(id: ID!): Movie
    getTopMovies(input: inputMovie, top: Int!): [Movie]
}

type Mutation {
    createMovie(input: inputMovie): Movie
    updateMovie(id: ID!, input: inputMovie): Movie
    deleteMovie(id: ID!): Movie
}

`;

