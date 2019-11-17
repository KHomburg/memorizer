import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_USER,
  USER_ERROR
  //CURRENT_USER_LOADED
} from "./types";

//get user by id
export const getUser = (id) => async dispatch =>{
  try {
    const res = await axios.get("/api/users/" + id, 
      {headers: {Authorization: localStorage.token}}
    ) //TODO: make currentUser available here
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}