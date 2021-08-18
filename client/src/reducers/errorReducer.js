import { GET_ERRORS, SET_USER } from "../actions/types";

const initialstate = {};
export default function(state = initialstate, action){

  switch(action.type){
   case GET_ERRORS:
   return action.payload
   default:
      return state;
  }
}