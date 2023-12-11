"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailFollowersEpisode = exports.SendEmailFollowers = void 0;
const emailer_1 = __importDefault(require("../emailer"));
const Like_1 = __importDefault(require("../Models/Like"));
const Filter_1 = require("./Filter");
const index_1 = require("../Mail/index");
const SendEmailFollowers = async (input) => {
    const query = (0, Filter_1.filter)(input);
    const likes = await Like_1.default.find(query).populate("user entityID");
    if (likes.length === 0)
        return;
    const html = await (0, index_1.htmlSerieUpdated)({
        serieName: likes[0].entityID.title,
        imgURL: likes[0].entityID.imgURL,
    });
    const followers = likes.map((like) => like.user);
    const users = [...new Set(followers)];
    const to = users.map((user) => user.email);
    const subject = `Nueva temporada de ${likes[0].entityID.title}`;
    await (0, emailer_1.default)({ to, subject, html });
};
exports.SendEmailFollowers = SendEmailFollowers;
const SendEmailFollowersEpisode = async (input, numCap, numTemp) => {
    const query = (0, Filter_1.filter)(input);
    const likes = await Like_1.default.find(query).populate("user entityID");
    if (likes.length === 0)
        return;
    const html = await (0, index_1.htmlTemporada)({
        serieName: likes[0].entityID.title,
        numCap,
        numTemp,
        imgURL: likes[0].entityID.imgURL,
    });
    const followers = likes.map((like) => like.user);
    const users = [...new Set(followers)];
    const to = users.map((user) => user.email);
    const subject = `Nueva Episodio de ${likes[0].entityID.title} Temporada ${numTemp} Capitulo ${numCap}`;
    await (0, emailer_1.default)({ to, subject, html });
};
exports.SendEmailFollowersEpisode = SendEmailFollowersEpisode;
