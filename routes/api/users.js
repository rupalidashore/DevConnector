//Post API Code

const express = require('express');
const bcrypt = require('bcryptjs');//convert plain text to hased form
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const router = express.Router(); //create a instance of express
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/registration');

// @route   POST api/users/register[call 1st api register]
// @desc    Register a user
//@access   public

router.post('/register', (req,res)=>{
  //validation
 const {errors,isValid} = validateRegisterInput(req.body);
 console.log("Validate error" + errors);
 console.log("isValid = " + isValid )
  if (!isValid){
    return res.status(400).json(errors);
  }
  

  User.findOne({email:req.body.email})
  //promise  statement
  .then(user =>{                      
    if(user){
      return res.status(400).json({email:'Email already exists'});
    }else{
      //call external api gravatar
      const avatar = gravatar.url(req.body.email,{
        s:'200', //pic size
        r: 'pg', //pg rating
        d:'mm'   //default picture
      });
      // Create a new user Object
      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        avatar
      });
      //within a function we called another function hash 
      bcrypt.genSalt(10,(err,salt) => {
          if(err) throw err;
     
        bcrypt.hash(req.body.password,salt,(err,hash) => {
          if (err) throw err;
         newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
     });
   });
  }     
})
      
.catch(err => console.log(err));     
    
});
// @route POST api/users/login [call second api login]
// @desc   Login a user and generate a token
//@access public
router.post('/login',(req,res)=>{
  //validation

  const {errors, isValid} = validateLoginInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

   
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
      return res.status(404).json({email:'User not found'});
    }
    
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if(isMatch){
          //Payload
          const payload = {
            id:user.id,
            name:user.name,
            avatar:user.avatar
          };
      //Genrate/sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn:3600},
              (err,token) => {        //call back
                return res.json({token: 'Bearer' + token});
              })

        } else {
         
       
            return res.status(400).json({password: 'Incorrect password'});
         
         }
       })
      })
    .catch(err => console.log(err))
});
// @route POST api/users/current [call 3rd api current]
// @desc   Return current user information
//@access private

  router.get(
    '/current',
    passport.authenticate('jwt',{session:false}),//private api not public 
    (req,res) => {
        res.json(req.user);
    });


 module.exports = router;
