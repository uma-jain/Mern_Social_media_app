import {GET_PROFILE,PROFILE_ERROR} from './types'
import axios from 'axios'
import {loadUser} from "../actions/OauthActions"

//GET CURRENT USERS PROFILE

export const getcurrentProfile=()=>async dispatch=>{
 try {
     const res=await axios.get('/users/currentuserprofile')
     
     dispatch({type:GET_PROFILE,payload:res.data})
 } catch (error) {
    console.log(error)
     dispatch({type:PROFILE_ERROR,payload:error})
 }
}
export const updateCurentuserprofile=(formdata)=>async dispatch=>{
    try {
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
            const res=await axios.post('/users/editprofile',formdata,config)
        dispatch({type:GET_PROFILE,payload:res.data})
        dispatch(loadUser());
    } catch (error) {
        dispatch({type:PROFILE_ERROR,payload:{msg:error.response.statusText,status:error.response.status}})

    }
}