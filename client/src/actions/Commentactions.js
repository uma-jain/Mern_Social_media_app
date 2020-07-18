import { getPosts } from "./PostActions";
import axios from "axios";
import { SET_ERRORS } from "../actions/types";
export const addComment=(postId,text)=>async dispatch=>{
  try {
    const config={
        headers:{
        'Content-Type':'application/json'}
      }
      const res=await axios.post(`/api/posts/comment/${postId}`,{text:text},config)
       dispatch(getPosts())
  } catch (error) {
    console.log(error)
    dispatch({
      type: SET_ERRORS,
      payload: error.response
    })
  }
}
export const deleteComment=(postId,commentId)=>async dispatch=>{
  
  try {
    const config={
        headers:{
        'Content-Type':'application/json'}
      }
      const res=await axios.delete(`/api/posts/comment/${postId}/${commentId}`,config)
       dispatch(getPosts())
  } catch (error) {
    console.log(error)
    dispatch({
      type: SET_ERRORS,
      payload: error.response
    })
  }
}
export const editComment=(postId,commentId,text)=>async dispatch=>{
  try {
    const config={
        headers:{
        'Content-Type':'application/json'}
      }
      const res=await axios.patch(`/api/posts/comment/${postId}/${commentId}`,{text},config)
       dispatch(getPosts())
  } catch (error) {
    console.log(error)
    dispatch({
      type: SET_ERRORS,
      payload: error.response
    })
  }
}