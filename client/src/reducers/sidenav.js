import {SIDENAVE_PUBLIC_NOTES, SIDENAVE_MY_NOTES} from "../actions/types";

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
    case SIDENAVE_PUBLIC_NOTES:
      return{
        ...state,
        open: true,
        notesListType: "Public Notes",
        notes: payload,
        loading: false,
      }
    case SIDENAVE_MY_NOTES:
      return{
        ...state,
        open: true,
        notesListType: "My Notes",
        notes: payload,
        loading: false,
      }
    default:
      return state
  }
}
