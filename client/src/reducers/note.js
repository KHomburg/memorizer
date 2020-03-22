import { LOAD_NOTE_ERROR, GET_NOTE, GET_NOTE_ERROR, CREATE_NOTE_ERROR, CREATE_NOTE, LIST_NOTES, LIST_NOTES_ERROR, UPDATE_NOTE_ERROR, UPDATE_NOTE, MY_NOTES, MY_NOTES_ERROR, DELETE_NOTE, DELETE_NOTE_ERROR, SEARCH_PUBLIC_NOTES } from "../actions/types";

const initialState = {
  note: {
    title: "",
    content: "",
    text: "",
    tags: [],
  },
  notes: [],
  loading: true,
  error: {}
}

export default function(state= initialState, action){
  const {type, payload} = action;

  switch(type){
    case GET_NOTE:
    case UPDATE_NOTE:
      return{
        ...state,
        note: payload,
        loading: false
      }
    case LIST_NOTES:
    case MY_NOTES:
    case SEARCH_PUBLIC_NOTES:
      return{
        ...state,
        notes: payload,
        loading: false
      }
    case CREATE_NOTE:
      return{
        ...state,
        note: payload,
        loading: false
      }

    case DELETE_NOTE:
      return{
        ...state,
        note: payload,
        loading: false
      }
    case CREATE_NOTE_ERROR:
    case UPDATE_NOTE_ERROR:
    case LOAD_NOTE_ERROR:
    case LIST_NOTES_ERROR:
    case MY_NOTES_ERROR:
    case DELETE_NOTE_ERROR:
    case GET_NOTE_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      }

    default:
      return state
  }
}