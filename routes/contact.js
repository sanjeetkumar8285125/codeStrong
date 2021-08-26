const express = require('express');
const router = express.Router();
const contactModel=require('../model/Schema/contactSchema');
const nodemailer=require('nodemailer')
const {google}=require('googleapis')

const CLIENT_ID=process.env.CLIENT_ID
const CLIENT_SECRET=process.env.CLIENT_SECRET
const REDIRECT_URL=process.env.REDIRECT_URL
const REFRESH_TOKEN=process.env.REFRESH_TOKEN


router.get('/contact',(req,res)=>{
  res.render('contact')
})

router.post('/contact',async(req,res)=>{
const {firstname,lastname,emailid,number,language}=req.body

if(!firstname || !lastname || !emailid || !number || !language){
  req.flash('error_msg','All fields are required');
  return res.redirect('/contact')
}
try{
  const contactData=new contactModel({
    firstName:firstname,
    lastName:lastname,
    email:emailid,
    phone:number,
    courses:language
  })
  const data=await contactData.save();
  const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL);
  oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
  const accessToken=oAuth2Client.getAccessToken();
  const transport=nodemailer.createTransport({
      service:'gmail',
      auth:{
          type:'OAuth2',
          user:'sanjeet3357@gmail.com',
          clientId:CLIENT_ID,
          clientSecret:CLIENT_SECRET,
          refreshToken:REFRESH_TOKEN,
          accessToken:accessToken
      }
  })
  const output=
    `<p>Thanks for submitting Form Data </p>
    <br>
    <hr>
    <table width="50%">
    <tr>
    <td>Fistname</td>
    <td>${data.firstName}</td>
    </tr>
    <tr>
    <td>Last Name</td>
    <td>${data.lastName}</td>
    </tr>
    <tr>
    <td>Email</td>
    <td>${data.email}</td>
    </tr>
    <tr>
    <td>Phone Numbr</td>
    <td>${data.phone}	</td>
    </tr>
    <tr>
    <td>Course</td>
    <td>${data.courses}	</td>
    </tr>
    </table>
    `
  const mailOptions={
    from:'Code Strong <sanjeet3357@gmail.com>',  //sender email id
    to:"adityatanwar99@gmail.com,adityakumarst12@gmail.com,info@codestrong.in",             //reciever email address
    subject:"Code Strong Customer contact us form data",   //subject of email
    generateTextFromHTML: true,
    html:output
};
const result=await transport.sendMail(mailOptions);
req.flash('success_msg','Thanks for contacting us!. We will get back to you soon')
res.redirect('/contact')
  // res.status(201).json({message:"form Submitted Successfully",data:data,success:true})
}catch(err){
  req.flash('error_msg','Something went wrong!')
  res.redirect('/contact')
  // res.status(400).json({message:"Something went wrong",err:err.message,success:false})
}
})


module.exports = router;
