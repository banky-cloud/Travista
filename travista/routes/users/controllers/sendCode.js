import { createPasswordTemplate, generateResetCode } from "../../../emailTemplate.js"
import userModel from "../../../models/userModel.js"
import {sendEmail} from "../../../mail.js"


export default async function sendCode(req,res,next) {
   try {
    const {email}=req.body
    console.log(email)
        const thisUser= await userModel.findOne({email})
        if(thisUser){
            const code=generateResetCode()
            await sendEmail({html:createPasswordTemplate(code),to:email, subject: "Password reset"})
           
            return res.status(200).json({success:true,result:code})
        }
        else{
            return res.status(404).json({success:false,result:"No user with the email provided"})
        }
    
   } catch (error) {
    next({code:500,message:error.message})
   } 
}