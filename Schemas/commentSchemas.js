import { gql } from "apollo-server";

export default gql`
    type Comment {
    id: ID!
    content: String!
    entityType: String!
    entityID: entityID!
    parent: Comment
    user: User
    commentCount: Int
    likeCount: Int
    createdAt: String
    updatedAt: String
    status: String
}

input inputComment {
    content: String
    entityID: ID
    entityType: String
    parent: ID
    status: String
}

type Query {
    getComments(input: inputComment): [Comment]
    getComment(id: ID!): Comment
}

type Mutation {
    createComment(input: inputComment): Comment
    updateComment(id: ID!, input: inputComment): Comment
    deleteComment(id: ID!): Comment
}`;