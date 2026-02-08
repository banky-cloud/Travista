import { google } from "googleapis";

const BASE_URL = "http://localhost:5000"
export default function startAuth(){
  const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `${BASE_URL}/auth/google/callback`
);

let gmailAuth; // holds login session (simple demo)



}