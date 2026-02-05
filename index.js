import { config } from "dotenv";
import express from "express"
import connect_db from "./connect_db.js";
import handleError from "./createCustomError.js";
import { google } from "googleapis";
import  cors    from    "cors"
import userRouter from "./routes/users/userRoute.js";
import userModel from "./models/userModel.js";
import tripRouter from "./routes/trips/tripRoute.js";
import { sendEmail } from "./mail.js";
import { createWelcomeTemplate } from "./emailTemplate.js";



config()
const server=express();
console.log(process.env.jwt_secret)




server.use(express.json())
server.use(cors())
// middlewares
server.use("/users",userRouter);
server.use("trips",tripRouter)
server.get("/",(req,res)=>{
    return res.status(200).json({success:true,result:"Hello"})
})

server.use(handleError)





const BASE_URL = "http://localhost:5000/";

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  `${BASE_URL}/auth/google/callback`
);
console.log(oauth2Client);
let gmailAuth; // holds login session (simple demo)
server.get("/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.send"]
  });
  console.log(url);

 return res.status(200).json({success:true, result:url})
});
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  global.gmailAuth = oauth2Client;

  res.send("Login successful. You can send email now.");
});





const port=process.env.PORT||5000
const startServer=async()=>{
    try {
        await connect_db(process.env.mongo_uri)
      // await  userModel.deleteMany()
    
        // sendEmail({to:"chigbustephennamdi@gmail.com",subject:"text",html:createWelcomeTemplate("steve"),from:"immigrationconsultantsltd56@gmail.com"})

        server.listen(port,()=>{console.log(`server is listening on port ${port}`)})
    } catch (error) {
       console.log(error.message) 
    }
}
startServer()