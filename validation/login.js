const Validator =require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLoginInput(data){

  let errors = {};

  
//For Email
  if (!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }

  if  (isEmpty(data.email)){
      errors.email = 'Email is required';

  }
  //For Password
  if (!Validator.isLength(data.password, {min: 6, max:30})){
    errors.password = 'password must be between 6 and 30 characters';
  }
  if (isEmpty(data.password)){
    errors.password = 'Password is requierd';
  }
  


 return{
    errors,
    isValid: isEmpty(errors)
  }
}
