var createError = require('http-errors');
var cookieSession = require('cookie-session')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin');
var api = require('./routes/api');
var OrganApi = require('./routes/OrganApp/Api')
var OrganAdmin= require('./routes/OrganApp/admin');

var app = express();


console.log('run')


var cors = require('cors')

app.use(cors())

var corsOptions = {
   origin: 'http://157.245.97.232',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(cookieSession({
  name: 'session',
  keys: ['political-frames'],
 
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use('/', indexRouter);
app.use('/admin', usersRouter);
app.use('/api',api)
app.use('/OrganApi',OrganApi);
app.use('/organ-donation/admin',OrganAdmin);

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