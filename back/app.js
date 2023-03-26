require('express-async-errors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const indexRouter = require('./controllers');
const { connect } = require('./utils/db');
const User = require('./models/User')
const usersRouter = require('./controllers/users');
const cors = require("cors");
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const associations = require("./utils/associations");
const postsRouter = require('./controllers/posts');
const Follow = require('./models/Follow');

var app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/",indexRouter)
app.use("/users", usersRouter)
app.use("/posts",postsRouter)

connect()

const syncModels = async()=>{
  await User.sync({alter:true})
  await Post.sync({alter:true})
  await Follow.sync({alter:true})
}

associations()
syncModels()

// error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log("error name", error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'type error' })
  } 
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }
  return response.status(400).send(error)
}

app.use(errorHandler)

module.exports = app;
