import { REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,USER_LOADED,AUTH_FAIL,RESET_USER } from "../actions/types";

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function(state=initialState,action){
   switch(action.type){
    
    case USER_LOADED:
        return{
            ...state,
            isAuthenticated:true,
            loading:false,
            user:action.payload
        }
     case RESET_USER:
        return{
            ...state,
              loading:false,
            
        }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
        localStorage.setItem('token',action.payload.token)
         return{
             ...state,
             ...action.payload,
             isAuthenticated:true,
             loading:false,
             

         }
     case REGISTER_FAIL:
     case LOGIN_FAIL:
     case AUTH_FAIL: 
     case LOGOUT:   
         localStorage.removeItem('token')
         return {
             ...state,
             isAuthenticated:false,
             loading:false,
             token:null,
             user:null
        }   
        default:
            return state;  
            
   
    } 
}