import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_USER,
  USER_ERROR,
  LIST_USERS,  
  LIST_USERS_ERROR,
  EDIT_USER,
  EDIT_USER_ERROR
} from "./types";

//get user by id
export const getUser = (id) => async dispatch =>{
  try {
    const res = await axios.get("/api/users/" + id, 
      {headers: {Authorization: localStorage.token}}
    )
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

//get all users
export const listUsers = () => async dispatch =>{
  try {
    const res = await axios.get("/api/users/", 
      {headers: {Authorization: localStorage.token}}
    )
    dispatch({
      type: LIST_USERS,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: LIST_USERS_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//edit user
export const editUser = ({email, username, profession, about}, id) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({email, username, profession, about})
  try {
    const res = await axios.put("/api/users/"+id, body, config)
    dispatch({
      type: EDIT_USER,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: EDIT_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}