"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlTemporada = exports.htmlSerieUpdated = exports.htmlWelcome = void 0;
const fs_1 = __importDefault(require("fs"));
const htmlWelcome = ({ userName }) => {
    if (!userName)
        throw new Error("userName is required");
    const WelcomeTemplate = fs_1.default.readFileSync("./Mail/WelcomeTemplate.html", "utf8");
    const modifedWelcome = WelcomeTemplate.replace(/@userName/g, userName);
    return modifedWelcome;
};
exports.htmlWelcome = htmlWelcome;
const htmlSerieUpdated = async ({ serieName, imgURL }) => {
    if (!serieName)
        throw new Error("serieName is required");
    if (!imgURL)
        throw new Error("imgURL is required");
    console.log(serieName);
    const SerieUpdated = fs_1.default.readFileSync("./Mail/SerieUpdated.html", "utf8");
    const modifedSerie = SerieUpdated.replace(/@serieName/g, serieName).replace(/@imgURL/g, imgURL);
    return modifedSerie;
};
exports.htmlSerieUpdated = htmlSerieUpdated;
const htmlTemporada = ({ serieName, numCap, numTemp, imgURL }) => {
    if (!serieName)
        throw new Error("serieName is required");
    if (!numCap)
        throw new Error("numCap is required");
    if (!numTemp)
        throw new Error("numTemp is required");
    if (!imgURL)
        throw new Error("imgURL is required");
    const TemporadaUpdated = fs_1.default.readFileSync("./Mail/TemporadaUpdated.html", "utf8");
    const modifedTemp = TemporadaUpdated.replace(/@serieName/g, serieName).replace(/@numCap/g, numCap).replace(/@numTemp/g, numTemp).replace(/@imgURL/g, imgURL);
    return modifedTemp;
};
exports.htmlTemporada = htmlTemporada;
