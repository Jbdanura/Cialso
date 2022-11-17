var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const indexRouter = require('./controllers');
const { connect } = require('./utils/db');
const User = require('./models/User').User;
const usersRouter = require('./controllers/users');
const cors = require("cors");
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Friendship = require('./models/User').Friendship;
const associations = require("./utils/associations");
const postsRouter = require('./controllers/posts');

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/",indexRouter)
app.use("/users", usersRouter)
app.use("/posts",postsRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

connect()

const syncModels = async()=>{
  await User.sync({alter:true})
  await Post.sync({alter:true})
}

associations()
syncModels()

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
