import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';

//state actions
import {listNotes, myNotes} from "../../actions/note"
import {logout} from "../../actions/auth"
import {sidenavPublicNotes, sidenavMyNotes} from "../../actions/sidenav"

//ICONS
import searchIcon from "../../icons/search_icon.svg"
import contentIcon from "../../icons/content_icon.svg"
import createIcon from "../../icons/create_note_icon.svg"
import myContentIcon from "../../icons/mycontent_icon.svg"
import profileIcon from "../../icons/profile_icon.svg"
import logoutIcon from "../../icons/logout_icon.svg"

//import {logout} from "../../actions/auth"

const Sidenav = ({listNotes, myNotes, logout, sidenavPublicNotes, sidenavMyNotes, auth: {isAuthenticated, loading, currentUser},}) => {
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
    sidenavPublicNotes()
    open()
  }

  const openMyNotes = (e) => {
    e.preventDefault()
    myNotes()
    sidenavMyNotes()
    open()
  }


  return (
    <div>
    {
      (!loading && isAuthenticated) && 
        <Fragment>
          <div className="sidenav">
            <Link onClick={e => open(e)} data-tooltip="Search" data-tooltip-location="right">
              <img src={searchIcon} height="20px" width="20px" />
            </Link>
            <Link onClick={e => openMyNotes(e)} data-tooltip="My Notes" data-tooltip-location="right">
              <img src={myContentIcon} height="20px" width="20px"/>
            </Link>
            <Link onClick={e => openAllNotes(e)} data-tooltip="All Notes" data-tooltip-location="right">
              <img src={contentIcon} height="20px" width="20px"/>
            </Link>
            <Link to="/notes/new" onClick={close} data-tooltip="Write a Note" data-tooltip-location="right">
              <img src={createIcon} height="20px" width="20px"/>
            </Link>
            <Link to={"/users/"+currentUser.id} onClick={close} data-tooltip="My Profile" data-tooltip-location="right">
              <img src={profileIcon} height="20px" width="20px"/>
            </Link>
            <Link onClick={logout} data-tooltip="Logout" data-tooltip-location="right">
              <img src={logoutIcon} height="20px" width="20px"/>
            </Link>
          </div>
        </Fragment>
    }
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  listNotes: PropTypes.func.isRequired,
  myNotes: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  sidenavPublicNotes: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {
  listNotes, 
  myNotes, 
  logout, 
  sidenavPublicNotes,
  sidenavMyNotes,
})(Sidenav)
