import { Router } from "express";
import Register from "./controllers/register.js";
import login from "./controllers/login.js";
import sendCode from "./controllers/sendCode.js";
import resetPassword from "./controllers/resetPassword.js";
import  chargeUser from "./controllers/chargeUser.js"
import loginWithToken from "./controllers/loginWithToken.js";
import userModel from "../../models/userModel.js"

const userRouter=Router()

userRouter.get("/",async(req,res,next)=>{
  try{
    
    const allUsers=await userModel.find()
    console.log(allUsers);
    return res.status(200).json({success:true, result:allUsers})
  }catch(err){
    console.log(err.message)
    return res.status(500).json({success:false, result:err.message})
  }
})

userRouter.post("/register",Register)
userRouter.post("/login",login)
userRouter.post("/sendcode",sendCode)
userRouter.post("/resetpassword",resetPassword)
userRouter.post("/token",loginWithToken)
userRouter.post("/charge/:id",chargeUser)





export default userRouter