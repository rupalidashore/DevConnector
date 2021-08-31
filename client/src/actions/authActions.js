import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS ,SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

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
  .then(res =>{
    //1)save the token to the localstorage(browser storage)
    const {token} = res.data;
    //setItem is a json object
    localStorage.setItem('jwtToken',token);//jwtToken is a key

    //2)Set the token to the auth header
    setAuthToken(token);

    //3)Decode the token
    const decoded = jwt_decode(token);
    dispatch({
      type:SET_CURRENT_USER,
      payload:decoded
    })
})
  .catch(err =>
   dispatch({
      type:GET_ERRORS,
      payload:err.response.data
  })
  ); 
}

//Log out
   // For logout we don't need to pass the data
   export const logoutUser = () => dispatch =>{
    // Remove from localstorage
    localStorage.removeItem('jwtToken')

    //Remove auth header
    setAuthToken(false);

    //clear out user data from the redux store
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })

  }