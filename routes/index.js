const express = require('express');
const router = express.Router();
const feedbackModel=require('../model/Schema/feedbackSchema');
/* GET home page. */
router.get('/',async function(req, res, next) {
try{
const feedbackData=await feedbackModel.find({});
res.render('index',{data:feedbackData,success:''})
}catch(err){

}

});


module.exports = router;
