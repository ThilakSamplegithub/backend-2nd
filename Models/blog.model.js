const mongoose=require("mongoose")
const blogSchema= mongoose.Schema({
    username:{type:String},
    userId:{type:String},
     title:{type:String,required:true},
     content:{type:String,required:true},
     category:{type:String,required:true},
     date:{type:String},
     comments:{default:[]}
 })
const blogsModel=mongoose.model("blog",blogSchema)
module.exports={blogsModel}