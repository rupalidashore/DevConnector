import { GET_ERRORS ,SET_USER } from './types'
import axios from 'axios';
//Register user

export const registerUser = (userData,history) => dispatch => {
    axios
  .post('/api/users/register' , userData)
  .then(res => history.push('/login'))
  .catch(err => 
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
  })); 
}
//Login user
export const loginUser = userData => dispatch =>{
  axios
  .post('/api/users/login' , userData)
  .then(res => console.log(res.data))
  .catch(err => 
    dispatch({
      type:GET_ERRORS,
      payload:err.response.data
  })); 
}