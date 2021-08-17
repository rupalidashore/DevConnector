import { SET_USER } from './types'

//Register user

export const registerUser = (userData) => {
      return{
          type: SET_USER,
          payload: userData
      }
}