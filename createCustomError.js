const   handleError=(err,req,res,next)=>{
    let customMessage=err.message||"An error occured while processing your request"
    let customCode=err.code||code||500
    return res.status(customCode).json({success:false,result:customMessage})

}

export default handleError