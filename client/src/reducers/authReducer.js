import { SET_USER } from "../actions/types";

const initialstate = {
  isAuthenticated:false,
  user:{}
};
//eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialstate,action){

  switch(action.type){
  case SET_USER:
    return {
      ...state,
      user: action.payload
    }
  default:
    return state;
  }
}