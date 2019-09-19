const passport = require('passport');
;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require("../models/user");
const bcrypt = require('bcryptjs');
const util = require('util');
const compareAsync = util.promisify(bcrypt.compare);


passport.use(new LocalStrategy(function(username, password, done){
  let userObj;
  UserModel.findOne({email:username})
    .then(user => {
      userObj = user;
     return  compareAsync(password, user.password);
    })
    .then(isEqual => {
        if(isEqual){
          return done(null, userObj.toJSON());
        }
        return done(null, isEqual);
    })
    .catch(err => {
      done(err)
    });
}));

 passport.serializeUser(function(user, done){
   return done(null, user.email);
});

 passport.deserializeUser(function(email, done){
   return UserModel.findOne({email:email})
   .then(user => done(null, user))
   .catch(err => done(err));
 });