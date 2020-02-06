import axios from "axios"
import {setAlert} from "./alert"
import{
  SIDENAV_PUBLIC_NOTES,
  SIDENAV_MY_NOTES,
  CLOSE_COLLABSE,
  OPEN_SEARCH,
  SEARCH_PUBLIC_NOTES_SIDENAV,
} from "./types";

//get note by id
export const sidenavPublicNotes = () => async dispatch =>{
  try {
    const res = await axios.get("/api/notes", 
      {headers: {Authorization: localStorage.token}}
    )
    dispatch({
      type: SIDENAV_PUBLIC_NOTES,
      payload: res.data,
    })
    //return()
  }catch(err){
    //dispatch({
    //  type: CREATE_NOTE_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}

//get note by id
export const sidenavMyNotes = () => async dispatch =>{
  try {
    const res = await axios.get("/api/notes/mynotes", 
      {headers: {Authorization: localStorage.token}}
    )
    dispatch({
      type: SIDENAV_MY_NOTES,
      payload: res.data
    })
    //return()
  }catch(err){
    //dispatch({
    //  type: CREATE_NOTE_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}

//close collabse
export const closeCollabse = () => async dispatch =>{
  try {
    dispatch({
      type: CLOSE_COLLABSE,
    })
    //return()
  }catch(err){
    //dispatch({
    //  type: CREATE_NOTE_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}

//close collabse
export const openSearch = () => async dispatch =>{
  try {
    dispatch({
      type: OPEN_SEARCH,
    })
    //return()
  }catch(err){
    //dispatch({
    //  type: CREATE_NOTE_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}

//search and list result for public notes
export const searchPublicNotesSidenav = (term) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  const body = JSON.stringify({term})

  try {
    const res = await axios.get("/api/notes/filter", body, config);
    console.log(res.data)
    dispatch({
      type: SEARCH_PUBLIC_NOTES_SIDENAV, 
      payload: res.data
    })
  }catch(err){
    //dispatch({
    //  type: LIST_NOTES_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}