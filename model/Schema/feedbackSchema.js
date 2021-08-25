const mongoose=require('../connection');
const Schema=mongoose.Schema
const feedbackSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"avatar-1577909_960_720.png"
    },
    comment:{
        type:String,
        trim:true,
        required:true
    }

},{timestamps:true})
const feedbackModal=mongoose.model('feedback',feedbackSchema);
module.exports=feedbackModal;