import {CREATE_POST,DELETE_POST,UPDATE_LIKES,UPDATE_POST,GET_POSTS,GET_POST,RESET_POST,POST_LOADING} from '../actions/types';

const initialState = {
  posts: [],
  loading:true
};
export default (state = initialState, action) => {
  
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
       posts:action.payload.data,
      loading:false
    };
      break;
    case CREATE_POST: {
 
      return {
        ...state,
       posts:[ 
         ...state.posts,
         action.payload
        ],
        loading:false
        }        
    
      
    }

  
    case UPDATE_POST: {
     
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.id) {
            return {
              ...post,
              text: action.text,
              author: action.author,
              loading:false
            };
          }
          return post;
        })
      };
    }
   /* case UPDATE_LIKES:
      return {
        ...state,
        posts:state.posts.map(()=>{
          if(post._id === action.payload._id){
            return{
              ...post,
              likers:likers
            }
          }
      
        })
      }
    */
    case DELETE_POST: {
    
      return {
        ...state,
        posts: state.posts.filter(post=>post._id !== action.id),
        loading:false
      };
     }
     case RESET_POST:
       return{
        posts: [],
         loading:false
       }
    
    default:
      return state;
  }
};