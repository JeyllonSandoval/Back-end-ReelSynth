import { gql } from "apollo-server";

export default gql`

type entityID {
    id: ID
    title: String
    description: String
    imgURL: String
    content: String
    user: User
    status: String
    likeCount: Int
    commentCount: Int
    year: Int
    genrers: [Genrer]
    seasons: Int
    rating: Float
    rateCount: Int
    createdAt: String
    updatedAt: String
    duration: Int
}

type Like {
    id: ID!
    liked: Boolean
    entityType: String!
    entityID: entityID
    user: User
    createdAt: String
    updatedAt: String
    status: String
}

input inputLikes {
    entityType: [String]
    entityID: [ID]
}

input inputLike {
    entityType: String
    entityID: ID
}

type Query {
    getLikes(input: inputLikes): [Like]
    getLike(entityID: ID!): Like
}

type Mutation {
    createLike(input: inputLike): Like
    deleteLike(entityID: ID!): Like
}


`;
