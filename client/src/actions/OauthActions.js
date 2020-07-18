import axios from "axios"
import {USER_LOADED,GET_ALL_USERS,AUTH_FAIL,REGISTER_FAIL,REGISTER_SUCCESS,RESET_POST,RESET_PROFILE,LOGIN_FAIL,LOGOUT,LOGIN_SUCCESS,RESET_USER, SET_ERRORS}  from "./types";
import setAuthToken from "./utils/setAuthToken";
import {seterrors} from "./errorAction"



export const loadUser=()=>async dispatch=>{
   
  if(localStorage.token){
   setAuthToken(localStorage.token)
   try {           
    const res=await axios.get('/auth/current');
    dispatch({type:USER_LOADED,payload:res.data})      
} catch (error) {

   dispatch({type:AUTH_FAIL}) 
}
  }
  else{
    dispatch({type:AUTH_FAIL}) 
  }
 
 
}
export const getAllUsers=()=>async dispatch=>{

   try {        
    const res=await axios.get('/users/get_all_users');
    dispatch({type:GET_ALL_USERS,payload:res.data})      
} catch (error) {
     alert(error);
   dispatch({type:SET_ERRORS,payload:error.response.data}) 
}
  }
   

export const registerUser = (user, history) =>async (dispatch) => {
  
  const config={
    headers:{
    'Content-Type':'application/json'}
  }
  const body=JSON.stringify(user);
  try {
                
    const res=await axios.post('/auth/register',body,config)
    dispatch({type:REGISTER_SUCCESS,payload:res.data})
    dispatch(loadUser());
    history.push('/')

}catch (error){
        if(error) {
           const errors=error.response.data.errors;
           if(errors){
            errors.forEach(error=>dispatch(seterrors(error.msg)))
        }
          }
   
 
  dispatch({type:REGISTER_FAIL});      
}
}

  export const login=(user)=>async(dispatch)=>{
    const config={
        headers:{
        'Content-Type':'application/json'}
      }
      const body=JSON.stringify(user);
    try {              
          const res=await axios.post('/auth/login',body,config)
          dispatch({type:LOGIN_SUCCESS,payload:res.data})
          dispatch(loadUser());
         
        
    }catch(error) {
       //alert(error)  
        if(error) {
      //  console.log('from oauthactions',error)
        const errors=error.response.data.errors;
        if(errors){
         errors.forEach(error=>dispatch(seterrors(error.msg)))
     }
       }
        dispatch({type:LOGIN_FAIL});          
    }
}

//LOGOUT
export const logoutUser=(history)=>dispatch=>{
  //console.log('history is',history)
  localStorage.removeItem('token');
     dispatch({type:LOGOUT})  
     dispatch({type:RESET_POST}) 
     dispatch({type:RESET_PROFILE}) 
     dispatch(loadUser());
     history.push('/')
}
