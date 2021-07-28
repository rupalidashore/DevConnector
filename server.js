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
app.use(express.urlencoded());
app.use(express.json()); //express convert all data in json format

//Db config
const db = keys.mongoURI;  //This is a connection string

mongoose
.connect(db)
.then(() => console.log('MongoDb connected')) //promise statement
.catch(err => console.log(err))


//passport config
app.use(passport.initialize());
require('./config/passport')(passport);

//Let's write our first route:route is the request coming from the client; url will dictate the request
// get and post are two most common routes;

app.get('/', (req,res) =>res.send('Hello World'));  //arrow statement (express route)


//use routes(path of url)
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = 5000; //port number
app.listen(port,() => console.log(`server is running on port ${port}`));