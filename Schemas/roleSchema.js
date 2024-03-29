import { gql } from "apollo-server";

export default gql`

type Role{
    id: ID!
    name: String!
    description: String
    createdAt: String
    updatedAt: String
}

input RoleInput{
    id: ID
    name: String
    description: String
}

type Query{ 
    getRoles(input: RoleInput): [Role]
    getRole(id: ID!): Role
}

type Mutation{
    createRole(input: RoleInput!): Role
    updateRole(id: ID!, input: RoleInput): Role
    deleteRole(id: ID!): Role
}

`;

