import axios from "axios"
import {setAlert} from "./alert"
import{
  GET_NOTE,
  GET_NOTE_ERROR,
  LIST_NOTES,
  LIST_NOTES_ERROR,
  CREATE_NOTE,
  LOAD_NOTE_ERROR,
  CREATE_NOTE_ERROR,
  UPDATE_NOTE,
  UPDATE_NOTE_ERROR,
  MY_NOTES,
  MY_NOTES_ERROR,
  DELETE_NOTE,
  DELETE_NOTE_ERROR,
  SEARCH_PUBLIC_NOTES,
  GET_PAGINATED_NOTES,
  GET_PAGINATED_NOTES_ERROR,
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
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error, "danger")))
    }
    dispatch({
      type: GET_NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}


//Create new Note
export const createNote = (formData, history) => async dispatch => {
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify(formData)

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
      type: CREATE_NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//list notes
export const listNotes = (page) => async dispatch =>{
  var limit = 20
  if(!page){page = 1}
  var offset = page>1 ? ((page-1) * 20) : (0)
  try {
    const res = await axios.get("/api/notes/public?" + "limit=" + limit + "&offset=" + offset, 
      {headers: {Authorization: localStorage.token}}
    )
    dispatch({
      type: LIST_NOTES,
      payload: res.data
    })
  }catch(err){
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
    }
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
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
    }
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
    dispatch(setAlert("Note Updated", "success"))
    return(res.data)
  }catch(err){
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
    }
    dispatch({
      type: UPDATE_NOTE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}

//Delete a Note by its id
export const deleteNote = (id, history) => async dispatch => {
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  try {
    const res = await axios.delete("/api/notes/"+id, config)
    dispatch({
      type: DELETE_NOTE, 
      payload: res.data
    })
    dispatch(setAlert("Note deleted", "success"))
    history.push('/notesindex')
  }catch (err) {
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
    }
    dispatch({
      type: DELETE_NOTE_ERROR
    })
  }
}

//search and list result for public notes
export const searchPublicNotes = (term, history) => async dispatch =>{
  const config = {headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json"
  }}
  try {
    const res = await axios.get("/api/notes/public?search="+term, config);
    console.log(res.data)
    dispatch({
      type: SEARCH_PUBLIC_NOTES, 
      payload: res.data
    })
    history.push('/notesindex')
  }catch(err){
    if(err.response.data.errors){
      const errors = err.response.data.errors;
      if(errors){
        errors.forEach(error => dispatch(setAlert(error, "danger")))
      }
    }
    dispatch({
      type: LIST_NOTES_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
  }
}