import { GET_USER, GET_ALL_USERS } from '../actions/types';

const initialState = {
  loading:true,
  users:[],
 retrievedUser:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading:false,
        retrievedUser:action.payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        loading:false,
        users:action.payload
      };;
    default:
      return state;
  }
}