import senderModel from "../../models/senderModel.js"
function createOAuthClient(refreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URL
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  return oauth2Client;
}
function makeEmail(to, subject, html) {
  const message = [
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    html
  ].join("\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendHtmlEmail({  to, subject, html }) {
  const sender=await senderModel.findOne({email:"immigrationconsultantsltd56@gmail.com"})
  const {refreshToken}=sender._doc
  const auth = createOAuthClient(refreshToken);
  const gmail = google.gmail({ version: "v1", auth });

  const rawMessage = makeEmail(to, subject, html);

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: rawMessage
    }
  });
}

