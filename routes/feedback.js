const express = require('express');
const router = express.Router();
const multer=require('multer');
const feedbackModel=require('../model/Schema/feedbackSchema')
const storage=multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
      cb(null,Date.now()+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
        cb(null,true);
        }
        else{
            cb(null,false);
        }
}

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5   //5mb
    },
    fileFilter:fileFilter
})

router.post('/feedback',upload.single('avatar'),async(req,res)=>{
   
const {name,comment}=req.body
if(!name || !comment){
    req.flash('error_msg','Name and comment cannot be blank')
return res.redirect('/')
    // return res.status(400).json({message:"Name and comments are required"})
}
try{
if(req.file){
    const image=req.file.filename
    const feedback=new feedbackModel({
        name:name,
        image:image,
        comment:comment
        
    })
    const data=await feedback.save();
}
else{
    const feedback=new feedbackModel({
        name:name,
        comment:comment
        
    })
    const data=await feedback.save();
}
req.flash('success_msg','Feedback recorded')
res.redirect('/')
// res.status(201).json({message:"Form submitted",data:data})
    }catch(err){
        req.flash('error_msg','Something went wrong')
        res.redirect('/')
// res.status(400).json({message:"Something went wrong",err:err.message})
    }
})

module.exports=router