import {verify} from "jsonwebtoken"

export default function verifyToken(req,res,next){
    try {
        verify(req.headers.token,process.env.jwt_secret,(err,data)=>{
            if(err){
                console.log(err.message)
                return res.status(500).json({success:false,result:err.message})
            }
            else{
                    req.userId=data.id;
                    next()
            }
        })
        
    } catch (error) {
        return res.status(500).json({success:false,result:error.message})
    }
}