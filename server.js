const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const users = require('./routes/api/users'); 
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();                         //Create a Instance for express which is called 'app'
//Body parser config
app.use(express.urlencoded());
app.use(express.json());

//Db config
const db = keys.mongoURI;
mongoose
.connect(db)
.then(() => console.log('MongoDb connected'))
.catch(err => console.log(err))

//Let's write our first route
app.get('/', (req,res) =>res.send('Hello World'));


//use routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = 5000;
app.listen(port,() => console.log(`server is running on port ${port}`));