import axios from "axios";
import {setAlert} from "./alert"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CURRENT_USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
}from "./types";

//Load User
export const loadUser = () => async dispatch=>{
  try{
    const res = await axios.get("/api/users/auth", {headers: {Authorization: localStorage.token}})
    dispatch({
      type: CURRENT_USER_LOADED,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//Register User
export const register = ({username, email, password, password2}, history) => async dispatch => {
  const config = {
    headers : {
      "Content-Type": "application/json"
    }
  }
  const body = JSON.stringify({username, email, password, password2})
  try {
    const res = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    history.push('/users/login')
  }catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//Login User
export const login = ({email, password}, history) => async dispatch => {
  const config = {
    headers : {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({email, password})
  console.log(body)

  try {
    const res = await axios.post("/api/users/login", body, config);
    console.log(res)
    dispatch({
      type: LOGIN_SUCCESS, 
      payload: res.data
    })
    history.push("/notes")
  }catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

//Logout User
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}


