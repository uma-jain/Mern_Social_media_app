import { SET_ERRORS,REMOVE_ERRORS } from "../actions/types";

const initialState=[];
export default function(state=initialState,action){
    switch(action.type){
        case SET_ERRORS:
            return[...state,action.payload];
         case REMOVE_ERRORS:
             return state.filter(error=>error.id !== action.payload)  
          default:
              return state;
            }
}