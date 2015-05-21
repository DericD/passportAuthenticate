var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});
var userSchema = mongoose.Schema({
  local           :{
    email         : String,
    password      : String
  },
  facebook           :{
    id            : String,
    token         : String,
    displayName   : String,
    userName      : String
  },
  twitter         :{
    id            : String,
    token         : String,
    displayName   : String,
    UserName      : String
  },
  google          :{
    id            :String,
    token         :String,
    email         :String,
    name          :String
  }
});


//methods***********************************
//Generating a Hash*************************

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and expose it to our app

module.exports = mongoose.model('user', userSchema);