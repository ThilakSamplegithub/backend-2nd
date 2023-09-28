const express=require("express")
require('dotenv').config()
const {connection}=require("./config/db")
const cors=require("cors")
const {userRouter}=require("./Controller/user.routes")
const { blogRouter } = require("./Controller/blog.routes")
const { authMiddleware } = require("./Middlewares/auth.middleware")
const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api",userRouter)
app.use(authMiddleware)
app.use("/blogs",blogRouter)
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log(process.env.PORT,"port is running")
    }catch(err){
        console.log(err.message)
    }
})