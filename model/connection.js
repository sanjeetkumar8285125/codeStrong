const config=require('./config');
const mongoose=require('mongoose');
mongoose.connect(config.dbURL,{poolSize:config.poolSize,useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}).then(()=>{
    console.log("connection created");
}).catch((err)=>{[
    console.log(`error in db connection ${err}`)
]})
module.exports=mongoose;