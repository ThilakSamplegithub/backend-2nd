const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
  const token=req.headers.authorization
  if(token){
    jwt.verify(token,"masai",(err,decoded)=>{
        if(err){
            res.status(400).send({msg:"You are not authorized"})
        }else{
            console.log(decoded)
             req.userId=decoded.userId
             req.userName=decoded.userName
             next()
        }
    })
  }else{
    res.status(400).send({msg:"You are not authorized"})
  }
}
module.exports={authMiddleware}