import {SIDENAV_PUBLIC_NOTES, SIDENAV_MY_NOTES, CLOSE_COLLABSE} from "../actions/types";

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
      }
    default:
      return state
  }
}
