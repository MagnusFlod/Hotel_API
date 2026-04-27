require('dotenv').config();

// const { connectDB } = require('./mongodb');
// connectDB();
// const { auth } = require('express-openid-connect');
// require('./redis');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const bodyParser = require('body-parser');

var methodOverride = require('method-override');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var hotelsRouter = require('./routes/hotels');
var roomsRouter = require('./routes/rooms');
var startRouter = require('./routes/start');

var db = require("./models");
db.sequelize.sync({ force: false });
/*
const config =
{
  authRequired: false,
  auth0Logout: true,
  secret: 'superlongsecret123',
  baseURL: 'http://localhost:3000',
  clientID: 'nUxtOdoOUvUkhqCNuRg5T06HbtIv92Oj',
  issuerBaseURL: 'https://dev-xu706gnm3ob85sl1.us.auth0.com'
};
*/
var app = express();

// app.use(auth(config));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session
({
  secret: 'random text',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore()
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);
app.use('/rooms', roomsRouter);
app.use('/start', startRouter);

app.use(bodyParser.json());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
