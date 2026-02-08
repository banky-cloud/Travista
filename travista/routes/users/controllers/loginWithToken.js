import jwt from "jsonwebtoken"
import userModel from "../../../models/userModel.js"

export default async function loginWithToken(req,res,next){
    try {
        const {token}=req.headers
        const {id}=jwt.verify(token,process.env.jwt_secret)

        const thisUser=await userModel.findById(id);
        const {password,...others}=thisUser._doc
        return res.status(200).json({success:true,result:others})
        
    } catch (error) {
       next({code:500,message:error.message}) 
    }
}