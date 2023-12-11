"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const role_1 = require("./role");
const user_1 = require("./user");
const movie_1 = require("./movie");
const genrer_1 = require("./genrer");
const studio_1 = require("./studio");
const producer_1 = require("./producer");
const serie_1 = require("./serie");
const episode_1 = require("./episode");
const season_1 = require("./season");
const host_1 = require("./host");
const country_1 = require("./country");
const comment_1 = require("./comment");
const like_1 = require("./like");
const rate_1 = require("./rate");
const video_1 = require("./video");
const company_1 = require("./company");
// Unimos todos los resolvers
const resolvers = (0, merge_1.mergeResolvers)([
    role_1.roleResolvers,
    genrer_1.genrerResolvers,
    country_1.countryResolvers,
    host_1.hostResolvers,
    producer_1.producerResolvers,
    studio_1.studioResolvers,
    user_1.userResolvers,
    movie_1.movieResolvers,
    serie_1.serieResolvers,
    season_1.seasonResolvers,
    episode_1.episodeResolvers,
    comment_1.commentResolvers,
    like_1.likeResolvers,
    rate_1.rateResolvers,
    video_1.videoResolvers,
    company_1.companyResolvers
]);
// Exportamos los resolvers ya unidos
exports.default = resolvers;
