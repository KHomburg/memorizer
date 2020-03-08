import React, {Fragment, useEffect, useSate} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';

//state actions
import {listNotes, myNotes} from "../../actions/note"
import {logout} from "../../actions/auth"
import {sidenavPublicNotes, sidenavMyNotes, closeCollabse, openSearch} from "../../actions/sidenav"

//ICONS
import searchIcon from "../../icons/search_icon.svg"
import contentIcon from "../../icons/content_icon.svg"
import createIcon from "../../icons/create_note_icon.svg"
import myContentIcon from "../../icons/mycontent_icon.svg"
import profileIcon from "../../icons/profile_icon.svg"
import logoutIcon from "../../icons/logout_icon.svg"
import sidenav from '../../reducers/sidenav';

//import {logout} from "../../actions/auth"

const Sidenav = ({closeCollabse, logout, sidenavPublicNotes, openSearch, sidenavMyNotes, auth: {isAuthenticated, loading, currentUser},}) => {

  const openAllNotes = (e) => {
    e.preventDefault()
    sidenavPublicNotes(0)
  }

  const openMyNotes = (e) => {
    e.preventDefault()
    sidenavMyNotes(0)
  }


  return (
    <div>
    {
      (!loading && isAuthenticated) && 
        <Fragment>
          <div className="sidenav">
            <Link onClick={() => openSearch()} data-tooltip="Search" data-tooltip-location="right">
              <img src={searchIcon} height="20px" width="20px" />
            </Link>
            <Link onClick={e => openMyNotes(e)} data-tooltip="My Notes" data-tooltip-location="right">
              <img src={myContentIcon} height="20px" width="20px"/>
            </Link>
            <Link onClick={e => openAllNotes(e)} data-tooltip="All Notes" data-tooltip-location="right">
              <img src={contentIcon} height="20px" width="20px"/>
            </Link>
            <Link to="/notes/new" onClick={() => closeCollabse()} data-tooltip="Write a Note" data-tooltip-location="right">
              <img src={createIcon} height="20px" width="20px"/>
            </Link>
            <Link to={"/users/"+currentUser.id} onClick={() => closeCollabse()} data-tooltip="My Profile" data-tooltip-location="right">
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
  closeCollabse: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {
  listNotes, 
  myNotes, 
  logout, 
  sidenavPublicNotes,
  sidenavMyNotes,
  closeCollabse,
  openSearch,
})(Sidenav)
