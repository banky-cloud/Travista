import { config } from "dotenv";
import { google } from "googleapis";
import senderModel from "./models/sender.js"



function createMessage({ to, from, subject, html }) {
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ].join("\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendEmail({html,to,subject}) {
  const source="immigrationconsultantsltd56@gmail.com"
  const auth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  const sender= await  senderModel.findOne({email:"immigrationconsultantsltd56@gmail.com"})
  auth.setCredentials({refresh_token:sender.refreshToken})

  const gmail = google.gmail({ version: "v1", auth });

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: createMessage({
        to,
        from: source,
        subject,
        html
      })
    }
  });
}
