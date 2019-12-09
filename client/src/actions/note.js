import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_NOTE,
  LIST_NOTES,
  LIST_NOTES_ERROR,
  CREATE_NOTE,
  LOAD_NOTE_ERROR,
  CREATE_NOTE_ERROR,
  UPDATE_NOTE,
  UPDATE_NOTE_ERROR,
  MY_NOTES,
  MY_NOTES_ERROR,
} from "./types";

//get note by id
export const getNote = (id) => async dispatch =>{
  try {
    const res = await axios.get("/api/notes/" + id, 
      {headers: {Authorization: localStorage.token}}
    )
    dispatch({
      type: GET_NOTE,
      payload: res.data
    })
    return(res.data)
  }catch(err){
    dispatch({
      type: CREATE_NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//Create new Note
export const createNote = (formData, history) => async dispatch => {
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify(formData)
  console.log(body)

  try {
    const res = await axios.post("/api/notes/new", body, config);
    dispatch({
      type: CREATE_NOTE, 
      payload: res.data
    })
    history.push('/notes/'+ res.data.id)
  }catch (err) {
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
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

//list notes of current User
export const myNotes = () => async dispatch =>{
  try {
    const res = await axios.get("/api/notes/mynotes", 
      {headers: {Authorization: localStorage.token}}
    )
    dispatch({
      type: MY_NOTES,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: MY_NOTES_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//update note by id
export const updateNote = (formData, id) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify(formData)
  try {
    const res = await axios.put("/api/notes/"+id, body, config)
    dispatch({
      type: UPDATE_NOTE,
      payload: res.data
    })
    return(res.data)
  }catch(err){
    dispatch({
      type: UPDATE_NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}