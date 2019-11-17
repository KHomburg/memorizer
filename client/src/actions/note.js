import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_NOTE,
  NOTE_ERROR
} from "./types";

//get user by id
export const getNote = (id) => async dispatch =>{
  try {
    const res = await axios.get("/api/notes/" + id, 
      {headers: {Authorization: localStorage.token}}
    )
    console.log(res.data)
    dispatch({
      type: GET_NOTE,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}