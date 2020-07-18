import {CREATE_POST,SET_ERRORS,GET_POST,GET_POSTS,DELETE_POST,UPDATE_POST,POST_LOADING,REMOVE_ERRORS} from "./types"
import axios from 'axios';

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: REMOVE_ERRORS
  };
};

export const getPost = id => dispatch => {


  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>{
      dispatch({
        type: GET_POST,
        payload: res.data
      })
      dispatch(getPosts)}
    )
    
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

export const getPosts=()=>async dispatch=>{
            try {
          const res=await axios.get("/api/posts")
          console.log(res.data)
          dispatch({type:GET_POSTS
            ,payload:res.data})
        } catch (error) {
         dispatch({
            type: GET_POSTS,
            payload: null
          })
          alert('error')
          console.log(error);
          
        }
        
    }

export const createPost = (text,firebaseUrl) =>async dispatch =>{
  dispatch(clearErrors());
  try {
    const formdata={};
    if(text) formdata.text=text
    if(firebaseUrl) formdata.postimageUrl=firebaseUrl
    const res=await axios.post('/api/posts',formdata)
    
     dispatch({
        type:CREATE_POST,
        payload: res.data
      });  
      dispatch(getPosts()); 
       
    
  } catch(error){
    console.log(error)
    dispatch({
      type: SET_ERRORS,
      payload: error.response
    })
  }


};

export const updatePost = (id, text, author) => dispatch =>
  axios.patch(`/api/posts/${id}`, { id, text, author }).then((res) => {
    dispatch({
      type:UPDATE_POST,
      id,
      text,
      author
    });
  });
 

export const deletePost = id => async dispatch =>{
  try {
    const res=await axios.delete(`/api/posts/${id}`)
    dispatch({ type: DELETE_POST,  id   });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data
    })
  }
  
  
}

export const updatepostlikes=(id)=>async dispatch=>{
 try {
   const res=await axios.patch(`api/posts/like/${id}`);
  
    dispatch(getPosts());

 } catch (error) {
  dispatch({
    type: SET_ERRORS,
    payload: error.response.data
  })
 }
}