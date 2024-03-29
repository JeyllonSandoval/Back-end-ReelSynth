import { gql } from "apollo-server";

export default gql`

type User{
    id: ID! 
    userName: String!
    password: String!
    firstName: String
    lastName: String
    imgURL: String
    email: String
    role: Role
    country: Country
    status: String
    createdAt: String
    updatedAt: String
}

type Token{
    token: String
}
input LoginInput{
    userName: String
    email: String
    password: String!
}

input UserInput{
    id: ID
    userName: String
    password: String
    firstName: String
    lastName: String
    imgURL: String
    role: ID
    country: ID
    email: String
}

type Query{ 
    getUserByToken(token: String): User
    getUsers(input: UserInput): [User]
    getUser(id: ID): User
}

type Mutation{
    login(input: LoginInput!): Token
    signup(input: UserInput!): Token
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
}

`;
