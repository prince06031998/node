var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var cors= require('cors');
// var insertRouter = require('./routes/admin/insert');
var adLogin =require('./routes/admin/adlogin');

var adSearchPost =require('./routes/admin/timpost');
var adSearchAu =require('./routes/admin/timau');
var adDelPost =require('./routes/admin/delp');
var adDelAuthor =require('./routes/admin/dela');
var adPost =require('./routes/admin/adminp');
var adEditPost =require('./routes/admin/admine');


var usersRouter = require('./routes/users');
// var updateRouter = require('./routes/admin/sua');
var updateNhanVien = require('./routes/user/update');
var addBlog = require('./routes/blog/themblog');

// var routerLogout=  require('./routes/user/dangxuat');
var routerLogin=  require('./routes/user/dangnhap');

var updateBlog = require('./routes/blog/updateb');
var delBlog = require('./routes/blog/delb');
var searchBlog = require('./routes/blog/timkiem');
// var searchRouter = require('./routes/admin/tim');
var regis = require('./routes/user/dangky');

var indexRouter = require('./routes/index');


var expressSession = require('express-session');
var MongoStore = require('connect-mongo');

const fileUpload = require('express-fileupload');

var app = express();

app.use(expressSession({
  secret:'secret',
  
  store: MongoStore.create({mongoUrl:'mongodb://localhost:27017/csdlnv'})
}))


// mongoose.connect('mongodb://localhost/csdlnv', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// let whitelist = ['http://localhost:5500','http://localhost:3000']

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     if(!origin) return callback(null, true);
//     if(whitelist.indexOf(origin) === -1){
//       var message = "mess";
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/them', insertRouter);
// app.use('/sua',updateRouter);
app.use('/dangnhap',routerLogin);
app.use('/adlog',adLogin);
app.use('/adpost',adPost);
app.use('/adfix',adEditPost);
app.use('/timpost',adSearchPost);
app.use('/timau',adSearchAu);
app.use('/delp',adDelPost);
app.use('/dela',adDelAuthor);
app.use('/suanv',updateNhanVien);
// app.use('/dangxuat',routerLogout);
app.use('/suablog',updateBlog);
app.use('/submit_themblog',addBlog);
app.use('/xoablog',delBlog);
app.use('/timbl',searchBlog);
// app.use('/tim',searchRouter);
app.use('/dangky',regis);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
