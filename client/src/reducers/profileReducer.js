import { GET_PROFILE,PROFILE_ERROR,RESET_PROFILE } from "../actions/types";
const initialState={
    profile:null,
    profiles:[],
    loading:true,
    error:{}
}

export default function(state=initialState,action){
switch(action.type){
 case GET_PROFILE:
    return{
  ...state,
  profile:action.payload,
  loading:false
    }

 case PROFILE_ERROR:  
 return{
   ...state,
   error:action.payload,
   loading:false

 }  
 case RESET_PROFILE:
   return{
    profile:null,
    profiles:[],
    error:{},
     loading:false
   }
 default:
      return state
}
}