//Post API Code

const express = require('express');
const bcrypt = require('bcryptjs');  //convert plain text to hased form
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router(); //create a instance of express
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');


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

  // below column name is email; in post api,  whenever you are sending the data, data is embedded in the body of message

  User.findOne({email:req.body.email})
  //promise  statement
  .then(user =>{                      
    if(user){
                // then means if the statement completes succefully, we evaluate if we found the record or not
            //user = data returned from req.body.email
            // specify email text box so it is easier to identify to whom the message is addressed
            // include status code, ex 404, 500. By default = 200


      return res.status(400).json({email:'Email already exists'});
    }else{
      //call external api gravatar
      const avatar = gravatar.url(req.body.email,{
        s:'200', //pic size
        r: 'pg', //pg rating
        d:'mm'   //default picture
      });


      // Create a new user Object
      // in order to write record into db, create instance of the model, basically a new row in the user's collection
           // if the user does not exist, then the following data will be encaptured
      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        avatar
      });

        // genSalt is a function; (err,salt) is callback
            // after 10 rounds you will either get an error or salt
            // throw error will get you out of the function immediately no need to write else

      
      bcrypt.genSalt(10,(err,salt) => {
          if(err) throw err;
     
        bcrypt.hash(req.body.password,salt,(err,hash) => {
          if (err) throw err;
         newUser.password = hash;
          newUser.save()      
          .then(user => res.json(user))
          .catch(err => console.log(err))
     });

     // give salt to hashing function. This was the main function that we wanted but we needed salt


   });// number of iterations = 10; using callback which means either  you will get error or salt. 
            // two parameters are passed err and salt.
            //.then() and .catch() could have been used as well instead.
            // throw err will halt the function immediately


 } 


})// need to check if user statement returned something or not
      
.catch(err => console.log(err));     
    
});
// @route POST api/users/login      [call second api login]
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
          //Payload is just Object
          const payload = {
            id:user.id,
            name:user.name,
            avatar:user.avatar
          };

      //Genrate/sign token
      // key is the same key that you will use to decrypt
            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn:3600},
              (err,token) => {        //call back
                return res.json({token: 'Bearer ' + token});
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
    passport.authenticate('jwt',{session:false}),  //private api not public 
    (req,res) => {
        res.json(req.user);
    });

// write an export statement
// only exporting routing because that is where all the configuration is being done.

 module.exports = router;
