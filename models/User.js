
           //Define User Model(registration/login page )

            const mongoose = require('mongoose');
            const Schema = mongoose.Schema;//Schema is the representation of data (blue print of data)
const UserSchema = new Schema({
  
  name: {
    type: String,
    required:true
},
    email:{
          type: String,
          required:true
        },
    password:{
      type: String,
      required:true
      },
    avatar:{
      type:String
      },
    date:{
    type:Date,
    default:Date.now
    }
});

module.exports = User = mongoose.model('users',UserSchema );    //To create a collection in the mongoose database and then export that.
//To use this js code in other files,it is importanted to wright this line in end of our code 