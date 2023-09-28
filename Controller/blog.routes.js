const { Router } = require("express");
const blogRouter = Router();
const { blogsModel } = require("../Models/blog.model");
blogRouter.post("/api/blogs/add", async (req, res) => {
  try {
    // let date = new Date(Date.UTC(2023, 11, 20, 3, 0, 0));
    let {userName,userId,title, content, category,date} = req.body;
    userId=req.userId
    userName=req.userName
    console.log(req.userName,req.userId)
    console.log(userName,userId)
    console.log(blogsModel)
    const blog = await blogsModel.create({
      title,
      content,
      category,
      userId,
      userName,
      // date:new Intl.DateTimeFormat().format(new Date(Date.UTC(2023, 11, 20, 3, 0, 0)))
      date
    });
    return res.status(200).send({ msg: blog });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
blogRouter.get("/api/blogs",async(req,res)=>{
try{
  let{title,category,order,sort}=req.query
  let query={}
  if(title){
    // console.log(title)
    const newTitle=RegExp(title,"i")
    query.title=newTitle
  }
  // if(order){
  //   sort="date"
  // }
  if(category){
    console.log(category)
    const newCategory=RegExp(category,"i")
    query.category=newCategory
  }
  if(title&&category){
    const newTitle=RegExp(title,"i")
    const newCategory=RegExp(category,"i")
    query={$and:[{title:newTitle},{category:newCategory}]}
  }
  const blogs=await blogsModel.find(query).sort({date:order==="asc"?1:-1})
 return res.status(200).json({data:blogs})
}catch(err){
  res.status(400).send({err:err.message})
}
})
blogRouter.patch("/api/blogs/:id",async(req,res)=>{
  try{
    const{id}=req.params
    console.log(id)
   const blog= await blogsModel.findOne({_id:String(id)})
   if(blog.userId){
    if(String(blog.userId)===req.userId){
      const blog=await blogsModel.updateOne({_id:id},{$set:req.body})
      return res.status(200).json({blog,msg:"updated successfully"})
    }else{
      res.status(200).send("you are not authorized")
    }
   }else{
    res.status(400).send({msg:"no such user exists"})
   }
  }catch(err){
 res.status(400).send({msg:err.message})
  }
  
})
blogRouter.delete("/api/blogs/:id",async(req,res)=>{
try{
  const{id}=req.params
  console.log(id)
 const blog= await blogsModel.findOne({_id:String(id)})
 if(blog.userId){
  if(String(blog.userId)===req.userId){
    const blog=await blogsModel.deleteOne({_id:id})
    return res.status(200).json({blog,msg:"deleted successfully"})
  }else{
    res.status(200).send("you are not authorized")
  }
 }else{
  res.status(400).send({msg:"no such user exists"})
 }
}catch(err){
  res.status(400).send({msg:err.message})
}
})
blogRouter.patch("/api/blogs/:id/comment",async(req,res)=>{
try{
  const {id}=req.params
 const comment=await blogsModel.updateOne({_id:String(id)},{$push:req.body})
 res.status(200).send({comment})
}catch(err){
  res.status(400).send({err:err.message})
}
})
module.exports={blogRouter}
