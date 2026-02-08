import userModel from "../../../models/userModel.js"
import {createNotificationTemplate} from "../../../emailTemplate.js"
import {sendEmail} from "../../../mail.js"

export default async function chargeUser(req,res,next){
  try{
  const {id}= req.params
  const thisUser= await userModel.findById(id);
  if(thisUser){
  await sendEmail({to:thisUser.email,subject:"Notification",html:createNotificationTemplate({userName:thisUser.firstName,title:"Notification",message:req.body.message
  })})
  const updatedUser= await userModel.findByIdAndUpdate(id, {$push:{bills:req.body}})
  }
  else{
    return res.status(400).json({success:false, result:"user not found"})
  }
  }
  catch(err){
    console.log(err.message)
    return res.status(500).json({success:false, result:err.message})
  }
}