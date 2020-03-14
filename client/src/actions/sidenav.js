import axios from "axios"
import {setAlert} from "./alert"
import{
  SIDENAV_PUBLIC_NOTES,
  SIDENAV_MY_NOTES,
  CLOSE_COLLABSE,
  OPEN_SEARCH,
  SEARCH_PUBLIC_NOTES_SIDENAV,
  SEARCH_MY_NOTES_SIDENAV,
  ADD_PAGINATED_NOTES,
} from "./types";


/*
for all note fetchers add: if(page  > 1 ) -> ADD_NOTES reducer
*/

//get note by id
export const sidenavPublicNotes = (page) => async dispatch =>{
  var limit = 20
  var offset = page * 20
  try {
    if(page>0){
      const res = await axios.get("/api/notes?" + "limit=" + limit + "&offset=" + offset, 
        {headers: {Authorization: localStorage.token}}
      )
      let data = {notes: res.data, page: page+1}
      dispatch({
        type: ADD_PAGINATED_NOTES,
        payload: data,
      })
    }else{
      const res = await axios.get("/api/notes?" + "limit=" + limit, 
        {headers: {Authorization: localStorage.token}}
      )
      dispatch({
        type: SIDENAV_PUBLIC_NOTES,
        payload: res.data,
      })
    }
  }catch(err){
    //dispatch({
    //  type: CREATE_NOTE_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}

//get note by id
export const sidenavMyNotes = (page) => async dispatch =>{
  var limit = 20
  var offset = page * 20
  try {
    if(page>0){
      const res = await axios.get("/api/notes/mynotes?" + "limit=" + limit + "&offset=" + offset, 
        {headers: {Authorization: localStorage.token}}
      )
      let data = {notes: res.data, page: page+1}
      dispatch({
        type: ADD_PAGINATED_NOTES,
        payload: data,
      })
    }else{
      const res = await axios.get("/api/notes/mynotes?" + "limit=" + limit, 
        {headers: {Authorization: localStorage.token}}
      )
      dispatch({
        type: SIDENAV_MY_NOTES,
        payload: res.data,
      })
    }
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
export const searchPublicNotesSidenav = (term, page) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  var limit = 20
  var offset = page * 20
  try {
    if(page>0){
      const res = await axios.get("/api/notes?search="+ term + "&limit=" + limit + "&offset=" + offset, 
        config
      )
      let data = {notes: res.data, page: page+1, term: term}
      dispatch({
        type: ADD_PAGINATED_NOTES,
        payload: data,
      })
    }else{
      const res = await axios.get("/api/notes?search="+ term + "&limit=" + limit, 
        config
      )
      let data = {notes: res.data, term: term}
      dispatch({
        type: SEARCH_PUBLIC_NOTES_SIDENAV,
        payload: data,
      })
    }
  }catch(err){
    //dispatch({
    //  type: LIST_NOTES_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}

//search and list result for public notes
export const searchMyNotesSidenav = (term, page) => async dispatch =>{
  const config = {headers: {Authorization: localStorage.token, "Content-Type": "application/json"}}
  var limit = 20
  var offset = page * 20
  try {
    if(page>0){
      const res = await axios.get("/api/notes/mynotes?search="+ term + "&limit=" + limit + "&offset=" + offset, 
        config
      )
      let data = {notes: res.data, page: page+1, term: term}
      dispatch({
        type: ADD_PAGINATED_NOTES,
        payload: data,
      })
    }else{
      const res = await axios.get("/api/notes/mynotes?search="+ term + "&limit=" + limit, 
        config
      )
      let data = {notes: res.data, term: term}
      dispatch({
        type: SEARCH_MY_NOTES_SIDENAV,
        payload: data,
      })
    }
  }catch(err){
    //dispatch({
    //  type: LIST_NOTES_ERROR,
    //  payload: {msg: err.response.statusText, status: err.response.status}
    //})
    console.log("sidenav error: ", err)
  }
}