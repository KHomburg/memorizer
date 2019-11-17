import {combineReducers} from "redux";
import alert from "./alert"
import auth from "./auth"
import user from "./user"
import note from "./note"

export default combineReducers({
  alert,
  auth,
  user,
  note
})