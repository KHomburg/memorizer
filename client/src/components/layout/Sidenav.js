import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {listNotes, myNotes} from "../../actions/note"
import {logout} from "../../actions/auth"

//ICONS
import searchIcon from "../../icons/search_icon.svg"
import contentIcon from "../../icons/content_icon.svg"
import createIcon from "../../icons/create_note_icon.svg"
import myContentIcon from "../../icons/mycontent_icon.svg"
import profileIcon from "../../icons/profile_icon.svg"
import logoutIcon from "../../icons/logout_icon.svg"

//import {logout} from "../../actions/auth"

const Sidenav = ({listNotes, myNotes, logout, auth: {isAuthenticated, loading, currentUser},}) => {
  const open = (e) => {
    if(document.getElementsByClassName("collabsible-open").length > 0){
    }else{
      var elem = document.getElementById("sidenav-collabse");
      elem.classList.add("collabsible-open")
    }
  }

  const close = () => {
    var elem = document.getElementById("sidenav-collabse");
    elem.classList.remove("collabsible-open")
  }

  const openAllNotes = (e) => {
    e.preventDefault()
    listNotes()
    open()
  }

  const openMyNotes = (e) => {
    e.preventDefault()
    myNotes()
    open()
  }


  return (
    <div>
    {
      (!loading && isAuthenticated) && 
        <Fragment>
          <div className="sidenav">
            <Link onClick={e => open(e)}>
              <img src={searchIcon} height="20px" width="20px"/>
            </Link>
            <Link onClick={e => openMyNotes(e)}>
              <img src={myContentIcon} height="20px" width="20px"/>
            </Link>
            <Link onClick={e => openAllNotes(e)}>
              <img src={contentIcon} height="20px" width="20px"/>
            </Link>
            <Link to="/notes/new" onClick={close}>
              <img src={createIcon} height="20px" width="20px"/>
            </Link>
            <Link to={"/users/"+currentUser.id} onClick={close}>
              <img src={profileIcon} height="20px" width="20px"/>
            </Link>
            <Link to="/notes/new" onClick={logout}>
              <img src={logoutIcon} height="20px" width="20px"/>
            </Link>
          </div>
        </Fragment>
    }
    </div>
  )
}

//Header.propTypes = {
//  logout: PropTypes.func.isRequired,
//  auth: PropTypes.object.isRequired,
//}

//  auth: state.auth
//})

const mapStateToProps = state => ({
  auth: state.auth,
  listNotes: PropTypes.func.isRequired,
  myNotes: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {listNotes, myNotes, logout})(Sidenav)
