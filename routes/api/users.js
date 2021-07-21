const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const router = express.Router();
const User = require('../../models/User');

router.get('/test', (req,res)=> res.json({msg:'users test route works!'}));

// @route POST api/users/register
// @desc Register a user
//@access public
router.post('/register', (req,res)=>{
  console.log('Inside /register')
  User.findOne({email:req.body.email})
  //promise  statement
  .then(user =>{                      
    if(user){
      return res.status(400).json({email:'Email already exists'});
    }else{
      
      const avatar = gravatar.url(req.body.email,{
        s:'200',
        r: 'pg',
        d:'mm'
      });
      
      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        avatar
      });
      
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
    module.exports = router;
