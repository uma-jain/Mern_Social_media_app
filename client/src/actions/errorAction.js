import { SET_ERRORS,REMOVE_ERRORS } from "../actions/types"
import { v4 as uuidv4 } from 'uuid';

export const seterrors=(msg)=>(dispatch)=>{
 const id=uuidv4();

dispatch({type:SET_ERRORS,payload:{msg,id}})

setTimeout(()=>dispatch({type:REMOVE_ERRORS,payload:id}),1000)
}

