var express = require('express');
var app = express();
var port     = process.env.PORT ||8080;
//var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//var routes = require('./routes/index');
var routes = require('./app/routes.js')(app, passport);
//require('./app/routes.js')(app, passport); //load our routes and passes in our app and full configures passport

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(morgan('dev')); duplicate
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'learn Node',
    resave: true,
    saveUninitialized: false
    })
);
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
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
//*************************************************************************

//configuration

mongoose.connect(configDB.url); //connects to our database

require('./config/passport'),(passport); // pass passport for configuration


//setup our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); //reads cookies needed for auth
//app.use(bodyParser()); // gets information form html forms // already set be removed


app.set('view engine', 'jade'); //setup jade for templating

//required for passport
app.use(session(
        {secret: 'manillavanillashapiesoup',
        resave: true,
        saveUninitialized: false
        } //session secret
    )
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); //use connect=flash for flash messages stores in session

//routes ------------------------------------
//require('./app/routes.js')(app, passport); //load our routes and passes in our app and full configures passport

//launch ------------------------------------
app.listen(port);
console.log('The Magic happens on port ' + port);
