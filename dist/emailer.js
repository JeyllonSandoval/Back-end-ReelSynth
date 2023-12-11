"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const config_1 = require("./config");
const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.CLIENT_ID, config_1.CLIENT_SECRET, config_1.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: config_1.REFRESH_TOKEN });
const options = async () => ({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "josewx324@gmail.com",
        clientId: config_1.CLIENT_ID,
        clientSecret: config_1.CLIENT_SECRET,
        refreshToken: config_1.REFRESH_TOKEN,
        accessToken: await oAuth2Client.getAccessToken(),
    },
});
// @ts-ignore
const createTrans = async () => nodemailer_1.default.createTransport(await options());
const sendEmail = async ({ to, subject, html }) => {
    const transporter = await createTrans();
    const configEmail = {
        from: '"ReelSynth" <noreply@ReelSynth.info>',
        to,
        subject,
        html,
    };
    const info = await transporter.sendMail(configEmail);
    console.log("Message sent: %s", info.messageId);
    return info;
};
exports.default = sendEmail;
