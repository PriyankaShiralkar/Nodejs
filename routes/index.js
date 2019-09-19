var express = require('express');
var router = express.Router();
const Auth = require('../lib/auth');
const passport = require('passport');
const _ = require('lodash');

//const UserModel = require("../models/user");
//const bcrypt = require('bcryptjs');
//const util = require('util');
//const compareAsync = util.promisify(bcrypt.compare);

/* GET home page. */
router.get('/', function(req, res, next) {
   if(req.isAuthenticated()){
     const first_name = _.get(req, 'user.name.first_name');
     const last_name = _.get(req, 'user.name.last_name');
     res.render('home', {
       name: first_name+ " "+ last_name
     });
     return;
    //return res.end('Loggedin');
   }
  res.render('index', {});
});

router.get('/register', function(req, res){
  res.render('register', {});
});

router.post('/register', function(req, res){
  const { email, password, firstName, lastName} = req.body;
  //const email = req.body.email;
  bcrypt.hash(password, 8, function(err, hashedPassword){
    const user = new UserModel({
      email,
      //password: bcrypt.hashSync(password),
      password:hashedPassword,
      name:{
        first_name: firstName,
        last_name:lastName
      }
    });
    user.save(function(err){
      res.redirect('/');
    });
  });
  
  
});

router.post('/login',passport.authenticate('local',{
  successRedirect: '/',
  failurRedirect: '/'
}))
/*router.post('/login', function(req,res){
  const{ username, password }= req.body;
  UserModel.findOne({email:username})
    .then(user => {
     return  compareAsync(password, user.password);
    })
    .then(isEqual => {
      req.session.isLoggedIn = isEqual;
        //if(isEqual){
        //req.session.user = user.toJSON();
        //}
        res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });*/


  /*UserModel.findOne({email:username},function(err, user){
    if(err){
      console.log(err);
      throw err;
    }

    bcrypt.compare(password, user.password, function(err, isEqual){
      if(err){
        console.log(err);
        throw err;
      }
      //if(isEqual){
        //req.session.isLoggedIn = true;

      //}
      //else{
        //req.session.isLoggedIn = false;
      //}
      req.session.isLoggedIn = isEqual;
      if(isEqual){
        req.session.user = user.toJSON();
      }
      res.redirect('/');
    })
  })
})*/
module.exports = router;
