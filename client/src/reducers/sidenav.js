import {SIDENAV_PUBLIC_NOTES, SIDENAV_MY_NOTES, CLOSE_COLLABSE, OPEN_SEARCH, SEARCH_PUBLIC_NOTES_SIDENAV, SEARCH_MY_NOTES_SIDENAV, ADD_PAGINATED_NOTES} from "../actions/types";

const initialState = {
  open: false,
  notesListType: "",
  notes: "",
  loading: true,
  page: 0,
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
        page: 1,
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
        open: true,
        notesListType: "Search Public Notes",
        notes: payload,
        loading: false
      }
    case SEARCH_MY_NOTES_SIDENAV:
      return{
        ...state,
        open: true,
        notesListType: "Search My Notes",
        notes: payload,
        page: 1,
        loading: false
      }
    case ADD_PAGINATED_NOTES:
      return{
        ...state,
        notes: [...state.notes, ...payload.notes],
        loading: false,
        page: payload.page
      }
    default:
      return state
  }
}
