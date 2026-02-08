import generateCode from "./getPaymentCode.js";
import userModel    from "../../../models/userModel.js"
import jwt from "jsonwebtoken"
import { createWelcomeTemplate} from "../../../emailTemplate.js";
import {sendEmail} from "../../../mail.js"

const Register=async(req,res,next)=>{
    try {
      const paymentCode=generateCode();
      console.log("hello")
        const newUser=await userModel.create({paymentCode,...req.body});

      await  sendEmail({html:createWelcomeTemplate(newUser.firstName),subject:"Welcome to Travista", to:newUser.email})
    
        console.log(newUser)
        const token= jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.jwt_secret)
        return res.status(200).json({success:true,result:token});
    } catch (error) {
      next({code:500,message:error.message})
      console.log(error.message)
      return
    }
}

export default Register