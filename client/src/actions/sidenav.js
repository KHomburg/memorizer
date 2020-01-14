import axios from "axios"
import {setAlert} from "./alert"
import{
  SIDENAV_PUBLIC_NOTES,
  SIDENAV_MY_NOTES,
  CLOSE_COLLABSE,
} from "./types";

//get note by id
export const sidenavPublicNotes = () => async dispatch =>{
  try {
    console.log("test")
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
    console.log("test")
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
    console.log("test")
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