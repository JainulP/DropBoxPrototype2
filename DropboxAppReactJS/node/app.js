/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var createdirectory = require('./routes/createdirectory');
var displayfilefolder = require('./routes/displayfilefolder');
var upload = require('./routes/upload');
var deletefile = require('./routes/deletefile');
var togglestar = require('./routes/togglestar');
var sharefiledir = require('./routes/sharefiledir');
var groups = require('./routes/groups');

var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo")(expressSessions);
var MongoClient = require('mongodb').MongoClient;


var app = express();

app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));

app.use('/', routes);
app.use('/users', users);
app.use('/createdirectory',createdirectory);
app.use('/displayfilefolder',displayfilefolder);
app.use('/upload',upload);
app.use('/deletefile',deletefile);
app.use('/toggleStar',togglestar);
app.use('/sharefiledir',sharefiledir);
app.use('/groups',groups);



app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});


module.exports = app;
