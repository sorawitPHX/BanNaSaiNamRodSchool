var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const connectDB = require('./db')
const upload = require('./middlewares/uploadMiddleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news')
var newsManagementRouter = require('./routes/news-management')

var app = express();
connectDB()


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts); // ใช้งาน express-ejs-layouts
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // ระบุให้ใช้ layout.ejs เป็น layout หลัก

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules', 'sweetalert2', 'dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter)
app.use('/news-management', newsManagementRouter)

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }
  // ส่ง URL ของรูปภาพกลับไปให้ TinyMCE เพื่อแสดง
  res.json({ location: `/uploads/${req.file.filename}` });
});

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
