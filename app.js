
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser')
const app = express();
const session=require('express-session');
const flash=require('connect-flash');
require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("uploads"))


app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{maxAge:1000*24*60*60}
}))
app.use(flash());
app.use(function(req, res, next) {
  res.locals.session=req.session
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use('/', require('./routes/index'));
app.use('/', require('./routes/contact'));
app.use('/',require('./routes/feedback'));

app.listen(process.env.PORT || 3000,(err)=>{
  if(err){
    console.log(`error in creating connection`);
  }
  else{
    console.log("server is up and running on port 3000")
  }
})


