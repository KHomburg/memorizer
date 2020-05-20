import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_USER,
  USER_ERROR,
  LIST_USERS,  
  LIST_USERS_ERROR,
  EDIT_USER,
  EDIT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  EDIT_USER_CREDENTIALS,
  EDIT_USER_CREDENTIALS_ERROR,
  LOGOUT
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
    return(res.data)
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
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
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: LIST_USERS_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//edit user
export const editUser = ({username, profession, about}, id) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({username, profession, about})
  try {
    const res = await axios.put("/api/users/"+id, body, config)
    dispatch({
      type: EDIT_USER,
      payload: res.data
    })
    dispatch(setAlert("Profile successfully updated", "success"))
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: EDIT_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//edit user credetnials
export const editUserCredentials = ({email, newPassword, oldPassword}, id) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({newemail: email, newpassword: newPassword, oldpassword: oldPassword})
  console.log(body)
  try {
    const res = await axios.put("/api/users/"+id+"/credentials", body, config)
    dispatch({
      type: EDIT_USER_CREDENTIALS,
      payload: res.data
    })
    dispatch(setAlert("Profile successfully updated", "success"))
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: EDIT_USER_CREDENTIALS_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//Delete a User by its id
export const deleteUser = (password, id, history) => async dispatch => {
  const config = {Authorization: localStorage.token, "Content-Type": "application/json"}
  try {
    const res = await axios.delete("/api/users/"+id, {data: {password: password}, headers: config})
    dispatch({
      type: DELETE_USER, 
      payload: res.data
    })
    dispatch({
      type: LOGOUT, 
      payload: null
    })
    history.push('/')
  }catch (err) {
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
    }
    dispatch({
      type: DELETE_USER_ERROR
    })
  }
}