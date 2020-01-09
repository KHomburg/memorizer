import axios from "axios"
import {setAlert} from "./alert"
import{
  SIDENAVE_PUBLIC_NOTES,
  SIDENAVE_MY_NOTES,
} from "./types";

//get note by id
export const sidenavPublicNotes = () => async dispatch =>{
  try {
    console.log("test")
    dispatch({
      type: SIDENAVE_PUBLIC_NOTES,
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
    dispatch({
      type: SIDENAVE_MY_NOTES,
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