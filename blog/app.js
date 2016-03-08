var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//链接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/liudosjk',function(err){
  if (!err) {
    console.log('链接MongoDB成功')
  }else{
    throw err
  }
});
//定义文档

var fs =require('fs');
fs.readFile('./sj/file.txt','utf-8',function(err,data){
  if(!err){
    console.log(data)
  }else{
    throw err;
  }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/404', routes);
app.use('/users', users);
app.use('/task', routes);
app.use('/tasknew', routes);
app.use('/task/:id/del',routes);
app.use('/task/:id/edit', routes);
app.use('/task/:id', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return res.redirect('/404');
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
