import userModel from "../../../models/userModel.js"
import jwt from "jsonwebtoken"

export default  async function login(req,res,next){
    try {
        const {email,password}=req.body
        const thisUser= await userModel.findOne({email})
        if(thisUser){

            if(thisUser.password===password){
                const token = jwt.sign({id:thisUser._id,isAdmin:thisUser.isAdmin},process.env.jwt_secret)
                return res.status(200).json({success:true,result:token})
            }
            else{
                return res.status(403).json({success:false,result:"Incorrect password"})
            }

        }else{
            return res.status(404).json({success:false,result:"User not found"})
        }
        
    } catch (error) {
        next({code:500,message:error.message})
    }
}
