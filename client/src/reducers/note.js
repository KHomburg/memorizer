import { LOAD_NOTE_ERROR, GET_NOTE, CREATE_NOTE_ERROR, CREATE_NOTE } from "../actions/types";

const initialState = {
  note: null,
  notes: [],
  loading: true,
  error: {}
}

export default function(state= initialState, action){
  const {type, payload} = action;

  switch(type){
    case GET_NOTE:
      return{
        ...state,
        note: payload,
        loading: false
      }
    case CREATE_NOTE:
      return{
        ...state,
        note: payload.note,
        loading: false
      }
    case CREATE_NOTE_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      }
    case LOAD_NOTE_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}