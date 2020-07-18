import { SET_ERRORS,UPDATE_FOLLOW_ERS_ING,GET_USER } from "./types";
import { loadUser,getAllUsers} from "./OauthActions";
import axios from 'axios'


export const update_followings=(id)=>async dispatch=>{
 try {
  const res= await axios.patch(`/users/follow/${id}`);
  
     dispatch(loadUser());
     dispatch(getAllUsers());

 } catch (error) {
  dispatch({
    type: SET_ERRORS,
    payload: error.response.data
  })
 }
}

export const retrieveUser= userId => async (dispatch) => {
  const result = await axios.get(`/users/user/${userId}`);
  return dispatch({
    type: GET_USER,
    payload: result.data
  });
};