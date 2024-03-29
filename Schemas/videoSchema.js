import { gql } from "apollo-server";

export default gql`

type Video {
    id: ID!
    url: String
    host: Host
    entityID: entityID
    entityType: String
    user: User
    createdAt: String
    updatedAt: String
    status: String
}
    
input inputVideo {
    url: String
    entityType: String
    entityID: ID
    host: ID
    status: String
}

type Query {
    getVideos(input: inputVideo): [Video]
    getVideo(id: ID!): Video
}

type Mutation {
    createVideo(input: inputVideo!): Video
    updateVideo(id: ID!, input: inputVideo!): Video
    deleteVideo(id: ID!): Video
}

`;

