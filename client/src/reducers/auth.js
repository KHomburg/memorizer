import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CURRENT_USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  currentUser: null
}

export default function(state = initialState, action) {
  const {type, payload} = action;
  switch(type){
    case CURRENT_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currentUser: payload.currentUser
      }
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return{
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return{
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        currentUser: null
      }
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return{
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    default:
      return state
  }
}
