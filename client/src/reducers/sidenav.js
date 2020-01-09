import {SIDENAVE_PUBLIC_NOTES, SIDENAVE_MY_NOTES} from "../actions/types";

const initialState = {
  open: false,
  notesListType: "",
  error: {}
}

export default function(state= initialState, action){
  const {type, payload} = action;

  switch(type){
    case SIDENAVE_PUBLIC_NOTES:
      return{
        ...state,
        open: true,
        notesListType: "Public Notes",
      }
    case SIDENAVE_MY_NOTES:
      return{
        ...state,
        open: true,
        notesListType: "My Notes",
      }
    default:
      return state
  }
}