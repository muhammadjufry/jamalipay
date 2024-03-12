const nodemailer = require("nodemailer");
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config({});
const OAuth2Mail = google.auth.OAuth2;
const OAuth2MailClient = new OAuth2Mail(
  process.env.GOOGLE_MAIL_CLIENT_ID,
  process.env.GOOGLE_MAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
OAuth2MailClient.setCredentials({
  refresh_token: process.env.MAIL_REFRESH_TOKEN,
});

const mailAccessToken = OAuth2MailClient.getAccessToken();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.USER_EMAIL_SENDER,
    clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    accessToken: mailAccessToken,
  },
});

type SendEmaillProps = {
  emailDestination: string;
  subject: string;
  content: string;
};

export default function sendEmail({
  emailDestination,
  subject,
  content,
}: SendEmaillProps) {
  transporter.sendMail({
    from: process.env.USER_EMAIL_SENDER,
    to: emailDestination,
    subject: subject,
    html: content,
  });
}
