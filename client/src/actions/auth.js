import axios from "axios";
import {setAlert} from "./alert"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
}from "./types";


//Register User
export const register = ({username, email, password, password2}) => async dispatch => {
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

