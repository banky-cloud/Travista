import userModel from "../../../models/userModel.js"

export default async function resetPassword(req,res,next){
    try {
        const {email,password}=req.body
        const updatedUser= await userModel.findOneAndUpdate({email},{$set:{password}})
        return  res.status(200).json({success:true,result:"password updated successfully"})
    } catch (error) {
      next({code:500,message:error.message})  
    }

}