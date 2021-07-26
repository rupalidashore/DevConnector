const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../models/User')


const opts={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

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