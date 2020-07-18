import { combineReducers } from 'redux';
import postsReducer from './postReducer';
import authReducer from "./authReducer";
import ErrorReducer from "./ErrorReducer";
import profileReducer from "./profileReducer";
import userReducer from "./UserReducer"
export default combineReducers({auth:authReducer,error:ErrorReducer,post:postsReducer,profile:profileReducer,users:userReducer});