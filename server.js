const express = require('express');//import express library,const express is just variable
const mongoose = require('mongoose');//liabraries that require here
const passport = require('passport')
const keys = require('./config/keys');
const users = require('./routes/api/users'); 
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
                       
//Create a Instance of express library which is called 'app',adding a library means you created a reference to library, but to use should create instance.
const app = express();

//Body parser config
app.use(express.urlencoded({ extended: true }));// if a user has special characters in the name. express will convert them to json.
app.use(express.json()); //express convert all data in json format

//Db config
const db = keys.mongoURI;  //This is a connection string

mongoose
.connect(db)
.then(() => console.log('MongoDb connected')) //promise statement
.catch(err => console.log(err))


//passport config
app.use(passport.initialize());// asking express to use passport to authenticate the token; it will look for token in the request
require('./config/passport')(passport);

//Create the  first route:route is the request coming from the client; url will dictate the request
// get and post are two most common routes;




//use routes(path of url)
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

if (process.env.NODE_ENV ==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(_dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 5000; //port number
app.listen(port,() => console.log(`server is running on port ${port}`));