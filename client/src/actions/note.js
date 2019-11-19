import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_NOTE,
  LIST_NOTES,
  LIST_NOTES_ERROR,
  CREATE_NOTE,
  LOAD_NOTE_ERROR,
  CREATE_NOTE_ERROR
} from "./types";

//get note by id
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
      type: CREATE_NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//Create new Note
export const createNote = ({title, text}) => async dispatch => {
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({title, text})
  console.log(body)

  try {
    const res = await axios.post("/api/notes/new", body, config);
    console.log(res)
    dispatch({
      type: CREATE_NOTE, 
      payload: res.data
    })
  }catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: CREATE_NOTE_ERROR
    })
  }
}

//list notes
export const listNotes = () => async dispatch =>{
  try {
    const res = await axios.get("/api/notes", 
      {headers: {Authorization: localStorage.token}}
    )
    console.log(res.data)
    dispatch({
      type: LIST_NOTES,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: LIST_NOTES_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}