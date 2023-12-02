import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const CLIENT_ID = `459550419296-2gq5umhopb9jah4kj114g2krh724iugi.apps.googleusercontent.com`
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04ufyVfGCdKIhCgYIARAAGAQSNwF-L9IrAd2JKnNY4xn8Mq8EvWf3rCRkumeutMAo3P5m2VXkXWdtmYRbeQ3CO7f80ZRyfGV3EGE"

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const createTrans = async () => nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "joaneliasc86@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: await oAuth2Client.getAccessToken()
    }
  });


const sendEmail = async ({to, subject, html}) => {
    const transporter = await createTrans()
    
    const configEmail = {
        from: '"ReelSynth" <noreply@ReelSynth.info>',
        to,
        subject,
        html
    }

    const info = await transporter.sendMail(configEmail)

    console.log("Message sent: %s", info.messageId);
    
    return info;
}

export default sendEmail