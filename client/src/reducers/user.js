import { USER_ERROR, GET_USER, LIST_USERS, LIST_USERS_ERROR } from "../actions/types";

const initialState = {
  user: null,
  users: [],
  loading: true,
  error: {}
}

export default function(state= initialState, action){
  const {type, payload} = action;

  switch(type){
    case GET_USER:
      return{
        ...state,
        user: payload,
        loading: false
      }
    case LIST_USERS:
        return{
          ...state,
          users: payload,
          loading: false
        }
    case USER_ERROR:
    case LIST_USERS_ERROR:
      return{
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}