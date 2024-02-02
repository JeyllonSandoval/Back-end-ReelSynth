import { mergeTypeDefs } from "@graphql-tools/merge";

import { gql } from "apollo-server";

// Leemos cada uno de los archivos de los Schemas
// const userSchema = fs.readFileSync("./user.graphql", "utf8");

const roleSchema = gql`
    type Role {
        id: ID!
        name: String!
        description: String
        createdAt: String
        updatedAt: String
    }

    input RoleInput {
        id: ID
        name: String
        description: String
    }

    type Query {
        getRoles(input: RoleInput): [Role]
        getRole(id: ID!): Role
    }

    type Mutation {
        createRole(input: RoleInput!): Role
        updateRole(id: ID!, input: RoleInput): Role
        deleteRole(id: ID!): Role
    }
`;
const userSchema = gql`
    type User {
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

    type Token {
        token: String
    }
    input LoginInput {
        userName: String
        email: String
        password: String!
    }

    input UserInput {
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

    type Query {
        getUserByToken(token: String): User
        getUsers(input: UserInput): [User]
        getUser(id: ID): User
    }

    type Mutation {
        login(input: LoginInput!): Token
        signup(input: UserInput!): Token
        createUser(input: UserInput!): User
        updateUser(id: ID!, input: UserInput!): User
        deleteUser(id: ID!): User
    }
`;
const genrerSchema = gql`
    type Genrer {
        id: ID!
        name: String!
        description: String
        status: String
    }

    input inputGenrer {
        name: String!
        description: String
        status: String
    }

    type Query {
        getGenrers(input: inputGenrer): [Genrer]
        getGenrer(id: ID!): Genrer
    }

    type Mutation {
        createGenrer(input: inputGenrer): Genrer
        updateGenrer(id: ID!, input: inputGenrer): Genrer
        deleteGenrer(id: ID!): Genrer
    }
`;

const movieSchema = gql`
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

const studioSchema = gql`
    type Studio {
        id: ID!
        name: String!
        description: String
        imgURL: String
        producer: Producer
        status: String
    }

    input inputStudio {
        name: String
        description: String
        imgURL: String
        producer: ID
        status: String
    }

    type Query {
        getStudios(input: inputStudio): [Studio]
        getStudio(id: ID!): Studio
    }

    type Mutation {
        createStudio(input: inputStudio): Studio
        updateStudio(id: ID!, input: inputStudio): Studio
        deleteStudio(id: ID!): Studio
    }
`;

const producerSchema = gql`
    type Producer {
        id: ID!
        name: String!
        description: String
        imgURL: String
        status: String
    }

    input inputProducer {
        name: String!
        description: String
        imgURL: String
        status: String
    }

    type Query {
        getProducers(input: inputProducer): [Producer]
        getProducer(id: ID!): Producer
    }

    type Mutation {
        createProducer(input: inputProducer): Producer
        updateProducer(id: ID!, input: inputProducer): Producer
        deleteProducer(id: ID!): Producer
    }
`;

const serieSchema = gql`
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

const seasonSchema = gql`
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
const episodeSchema = gql`
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
const hostSchema = gql`
    type Host {
        id: ID!
        name: String!
        description: String
        status: String
    }

    input inputHost {
        name: String!
        description: String
        status: String
    }

    type Query {
        getHosts(input: inputHost): [Host]
        getHost(id: ID!): Host
    }

    type Mutation {
        createHost(input: inputHost): Host
        updateHost(id: ID!, input: inputHost): Host
        deleteHost(id: ID!): Host
    }
`;
const countrySchema = gql`
    type Country {
        id: ID!
        name: String!
        lenguage: String
        createdAt: String
        updatedAt: String
    }

    input CountryInput {
        name: String
        lenguage: String
    }

    type Query {
        getCountrys(input: CountryInput): [Country]
        getCountry(id: ID!): Country
    }

    type Mutation {
        createCountry(input: CountryInput!): Country
        updateCountry(id: ID!, input: CountryInput): Country
        deleteCountry(id: ID!): Country
    }
`;
const commentSchema = gql`
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
    }
`;
const likeSchema = gql`
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
const rateSchema = gql`
    type Rate {
        id: ID!
        rate: Float
        entityID: entityID
        entityType: String
        user: User
        createdAt: String
        updatedAt: String
        status: String
    }

    input inputRate {
        rate: Float
        entityType: String
        entityID: ID
    }

    type Query {
        getRates(input: inputRate): [Rate]
        getRate(entityID: ID!): Rate
    }

    type Mutation {
        createRate(input: inputRate): Rate
        updateRate(entityID: ID!, rate: Float): Rate
        deleteRate(entityID: ID!): Rate
    }
`;
const videoSchema = gql`
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
const companySchema = gql`
    type Company {
        id: ID!
        imgURL: String
        name: String!
        description: String
        status: String
    }

    input inputCompany {
        imgURL: String
        name: String!
        description: String
        status: String
    }

    type Query {
        getCompanys(input: inputCompany): [Company]
        getCompany(id: ID!): Company
    }

    type Mutation {
        createCompany(input: inputCompany): Company
        updateCompany(id: ID!, input: inputCompany): Company
        deleteCompany(id: ID!): Company
    }
`;

// Unimos todos los Schemas en uno solo
const typeDefs = mergeTypeDefs([
    roleSchema,
    countrySchema,
    hostSchema,
    genrerSchema,
    producerSchema,
    studioSchema,
    userSchema,
    movieSchema,
    serieSchema,
    seasonSchema,
    episodeSchema,
    commentSchema,
    likeSchema,
    rateSchema,
    videoSchema,
    companySchema,
    ,
]);
export default typeDefs;
