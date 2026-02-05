import { Resend } from 'resend';

import nodemailer from "nodemailer";
import { google } from "googleapis";
import { config } from 'dotenv';
config()





export  async function sendEmail({ to, subject, text }) {
  

  
  try {


const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
  console.log("Access Token:", accessToken.token);
console.log(process.env.GMAIL_USER.trim())


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER.trim(),
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  return transporter.sendMail({ from: process.env.GMAIL_USER, to, subject, text });



  } catch (error) {
    console.log(error.message)
  }

  

}



const ms_token="mlsn.0ddf40986244b09b63b0b7b87d6d48157fdd03c02e8658d01ad66a8c169c2632"
export const createPasswordTemplate=(code)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:rgb(26, 176, 196); padding:28px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:1px;">
                Travista
              </h1>
              <p style="margin:6px 0 0; color:#e8fbff; font-size:14px;">
                Making travel simple for everyone
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px; color:#333333;">
              <h2 style="margin-top:0; font-size:22px;">
                Reset Your Password
              </h2>

              <p style="font-size:15px; line-height:1.6;">
                We received a request to reset your Travista account password.
                Use the verification code below to continue:
              </p>

              <!-- Code Box -->
              <div style="
                margin:28px 0;
                padding:18px;
                background:#f1fdff;
                border:2px dashed rgb(26, 176, 196);
                text-align:center;
                border-radius:10px;
                font-size:28px;
                letter-spacing:6px;
                font-weight:bold;
                color:rgb(26, 176, 196);
              ">
                ${code}
              </div>

              <p style="font-size:14px; color:#666666;">
                This code will expire in <strong>10 minutes</strong>.
                If you didn’t request a password reset, you can safely ignore this email.
              </p>

              <p style="font-size:14px; margin-top:28px;">
                Need help? We’re always here for you.
              </p>

              <p style="margin-bottom:0;">
                ✈️ <strong>– The Travista Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7fafa; padding:18px; text-align:center; font-size:12px; color:#999999;">
              © 2025 Travista. All rights reserved.<br/>
              Making journeys accessible, one trip at a time.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
}

export const createWelcomeTemplate=(userName)=>{
return  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Travista</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:rgb(26, 176, 196); padding:32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:30px; letter-spacing:1px;">
                Welcome to Travista ✈️
              </h1>
              <p style="margin:8px 0 0; color:#e8fbff; font-size:15px;">
                Your journey starts here
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:34px; color:#333333;">

              <h2 style="margin-top:0; font-size:22px;">
                Hi ${userName},
              </h2>

              <p style="font-size:15px; line-height:1.7;">
                We’re excited to have you on board! 🎉  
                Travista is built to make travel simple, affordable, and accessible—whether you’re planning your first trip or your next big adventure.
              </p>

              <!-- Highlights -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:26px 0;">
                <tr>
                  <td style="padding:10px 0; font-size:15px;">
                    🌍 Discover destinations with ease
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:15px;">
                    ✈️ Book flights without stress
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:15px;">
                    🏨 Find stays that fit your lifestyle
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <div style="text-align:center; margin:34px 0;">
                <a href="{{DASHBOARD_LINK}}" style="
                  background:rgb(26, 176, 196);
                  color:#ffffff;
                  text-decoration:none;
                  padding:14px 34px;
                  font-size:15px;
                  border-radius:30px;
                  display:inline-block;
                ">
                  Start Exploring
                </a>
              </div>

              <p style="font-size:14px; color:#666666;">
                If you ever need help, our support team is just a message away.
              </p>

              <p style="margin-bottom:0;">
                Safe travels,<br/>
                <strong>The Travista Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7fafa; padding:18px; text-align:center; font-size:12px; color:#999999;">
              © 2025 Travista. All rights reserved.<br/>
              Making journeys accessible, one trip at a time.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
}



export const sendMessage=async(email,html,subject)=>{
    try {

        const resend = new Resend("re_atApWDE4_cXxtEDDGCSELfnebt1j7Y24Q");


// const resend = new Resend('re_xxxxxxxxx');

await resend.emails.send({
  from: 'Acme <onboarding@resend.dev>',
  to: [email],
  subject,
    html

});
console.log("sent")

    } catch (error) {
       console.log(error.message) 
    }
}

export const generateResetCode=()=>{
    const str="123456789"
    let code=""

    for(let i=0;i<6;i++){
        code+=str[Math.floor(Math.random()*str.length)]
    }
    return code
}
