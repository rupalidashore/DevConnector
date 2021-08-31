import { CLEAR_ERRORS,GET_ERRORS, SET_ERROR} from "../actions/types";

const initialstate = {};
export default function(state = initialstate, action){

  switch(action.type){
   case GET_ERRORS:
   return action.payload
   case SET_ERROR:
      return action.payload;
    case CLEAR_ERRORS:
      return state;
   default:
      return state;
  }
}