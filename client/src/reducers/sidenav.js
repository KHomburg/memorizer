import {SIDENAV_PUBLIC_NOTES, SIDENAV_MY_NOTES, CLOSE_COLLABSE, OPEN_SEARCH, SEARCH_PUBLIC_NOTES_SIDENAV, SEARCH_MY_NOTES_SIDENAV} from "../actions/types";

const initialState = {
  open: false,
  notesListType: "",
  notes: "",
  loading: true,
  error: {}
}

export default function(state= initialState, action){
  const {type, payload} = action;

  switch(type){
    case SIDENAV_PUBLIC_NOTES:
      return{
        ...state,
        open: true,
        notesListType: "Public Notes",
        notes: payload,
        loading: false,
      }
    case SIDENAV_MY_NOTES:
      return{
        ...state,
        open: true,
        notesListType: "My Notes",
        notes: payload,
        loading: false,
      }
    case CLOSE_COLLABSE:
      return{
        ...state,
        open: false,
        loading: false,
      }
    case OPEN_SEARCH:
      return{
        ...state,
        open: true,
        notesListType: "Search",
        loading: false,
      }
    case SEARCH_PUBLIC_NOTES_SIDENAV:
      return{
        ...state,
        notes: payload,
        loading: false
      }
    case SEARCH_MY_NOTES_SIDENAV:
      return{
        ...state,
        notes: payload,
        loading: false
      }
    default:
      return state
  }
}
