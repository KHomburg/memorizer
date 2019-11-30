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
export const createNote = ({title, text, tags, content, isPublic}) => async dispatch => {
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({title, text, tags, content, isPublic})
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

//list notes of current User
export const myNotes = () => async dispatch =>{
  try {
    const res = await axios.get("/api/notes/mynotes", 
      {headers: {Authorization: localStorage.token}}
    )
    console.log(res.data)
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
export const updateNote = ({title, text, tags, content, isPublic}, id) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({title, text, tags, content, isPublic})

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