//kal july 18/19 lecture explain here

const JwtStrategy = require('passport-jwt').Strategy; //decrypt Jwt token
const ExtractJwt = require('passport-jwt').ExtractJwt; // how to extract the token from the request
const keys = require('./keys');
const User = require('../models/User')


const opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//In postman tool Header section is key called authorization and this is the key where we pass a token 
opts.secretOrKey = keys.secretOrKey; //key to use 



module.exports = passport => {
  passport.use(
    //this line show How to decode jwt token
    new JwtStrategy(opts,(payload, done) =>{       
      User.findById(payload.id)
      .then(user => {
        if(user){
            return done(null,user)
        }
        return done (null,false);
      })
      .catch(err => console.log(err));
    })
  );
};