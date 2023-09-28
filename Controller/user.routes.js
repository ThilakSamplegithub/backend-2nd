const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=Router()
const {userModel}=require("../Models/user.models")
userRouter.post("/register",async(req,res)=>{
   try{
    const{email,password,userName,avatar}=req.body
     bcrypt.hash(password,5,async(err,hashed)=>{
        try{
            if(err){
                res.send({msg:"please register again as password is not hashed"})
            }else{
                console.log(hashed)
               const user=await userModel.create({email,password:hashed,userName,avatar})
               return res.status(200).json({msg:user})
            }
        }catch(err){
            res.status(200).send({error:err.message})
        }
       
     })
   }catch(err){
    res.status(400).send({err:err.message})
   }
})
userRouter.post("/login",async(req,res)=>{
try{
  const {email,password}=req.body
   const user= await userModel.findOne({email})
   if(user){
    bcrypt.compare(password,user.password,(err,result)=>{
 if(err){
    res.status(300).send({msg:"wrong password"})
 }else{
    const token=jwt.sign({userId:user._id,userName:user.userName},"masai")
     return res.status(200).json({msg:"logged in successfully",token})
 }
    })
   }else{
    res.status(200).send({msg:"user doesn't exist"})
   }
}catch(err){
    res.status(400).send({err:err.message})
}
})
module.exports={userRouter}