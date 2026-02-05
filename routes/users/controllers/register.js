import generateCode from "./getPaymentCode.js";
import userModel    from "../../../models/userModel.js"
import jwt from "jsonwebtoken"
import { createWelcomeTemplate, sendMessage } from "../../../emailTemplate.js";

const Register=async(req,res,next)=>{
    try {
      const paymentCode=generateCode();
      console.log("hello")
        const newUser=await userModel.create({paymentCode,...req.body});

      await  sendMessage(newUser.email,createWelcomeTemplate(newUser.firstName),"Thanks For Joining")
    
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