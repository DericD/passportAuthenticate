/**
 * Created by Deric on 5/17/2015.
 */
/*** Created by Deric on 5/15/2015.*/
//gets all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT ||8080;
bson = require('bson');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB     = require('./config/database.js');

//configuration

mongoose.connect(configDB.url); //connects to our database

require('./config/passport'),(passport); // pass passport for configuration


//setup our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); //reads cookies needed for auth
app.use(bodyParser()); // gets information form html forms


app.set('view engine', 'jade'); //setup jade for templating

//required for passport
app.use(session(
        {secret: 'manillavanillashapiesoup'} //session secret
    )
);
//app.use(passport.initialize());
//app.use(passport.session()); // persistent login sessions
//app.use(flash()); //use connect=flash for flash messages stores in session

//routes ------------------------------------
//require('./app/routes.js')(app, passport); //load our routes and passes in our app and full configures passport

//launch ------------------------------------
app.listen(port);
console.log('The Magic happens on port ' + port);
