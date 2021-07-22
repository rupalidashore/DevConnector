//Post API Code

const express = require('express');
const bcrypt = require('bcryptjs');//convert plain text to hased form
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const router = express.Router(); //create a instance of express
const User = require('../../models/User');
const keys = require('../../config/keys');
const { countDocuments } = require('../../models/User');

router.get('/test', (req,res)=> res.json({msg:'users test route works!'}));

// @route   POST api/users/register
// @desc    Register a user
//@access   public
router.post('/register', (req,res)=>{
  console.log('Inside /register')
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
          if(err) console.log(err);
      console.log('req =' + req)
      console.log('req.body = ' + req.body);
      console.log('req.body.string = ' + req.body);
      console.log('Name = ' + req.body.name);      
      console.log('email = ' + req.body.email);          
      console.log('Password = ' + req.body.password);      
      console.log('salt = ' + salt);
        bcrypt.hash(req.body.password,salt,(err,hash) => {
          if (err) console.log(err);
          console.log('Hash = ' + hash);
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
// @route POST api/users/login
// @desc   Login a user and generate a token
//@access public
router.post('/login',(req,res)=>{
  console.log('Inside /login')
  console.log('email = ' + req.body.email);          
  console.log('Password = ' + req.body.password);    
  User.findOne({email:req.body.email})
    .then(user =>{
      if (!user){console.log('Login:User not found'); return res.status(404).json({email:'User not found'});
    }
    console.log('TRYING TO COMPARE PASSWORDS WITH' + user.password);          
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if(isMatch){
          //payload
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
          //return res.json({msg:'password matched for user' });
       
            return res.status(400).json({password: 'Incorrect password'});
         
      }
    })
    })
    .catch(err => console.log(err))
});

 module.exports = router;
