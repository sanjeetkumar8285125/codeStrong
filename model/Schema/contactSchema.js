const mongoose=require('../connection');
const Schema=mongoose.Schema;
const contactSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    courses:{
        type:String,
        required:true
    }
},{timestamps:true});

const contactModel=mongoose.model('contact',contactSchema);
module.exports=contactModel;