import { NOTE_ERROR, GET_NOTE } from "../actions/types";

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
    case NOTE_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}