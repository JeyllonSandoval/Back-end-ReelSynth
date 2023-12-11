import nodemailer from "nodemailer";
import { google } from "googleapis";
import {
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    REDIRECT_URI,
} from "./config.js";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const createTrans = async () =>
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "josewx324@gmail.com",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: await oAuth2Client.getAccessToken(),
        },
    });

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

export default sendEmail;
