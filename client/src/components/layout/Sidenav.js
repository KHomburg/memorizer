import React, {Fragment, useEffect, useSate} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';

//state actions
import {listNotes, myNotes} from "../../actions/note"
import {logout} from "../../actions/auth"
import {sidenavPublicNotes, sidenavMyNotes, closeCollabse, openCollabse,openSearch} from "../../actions/sidenav"

//ICONS
import searchIcon from "../../icons/search_icon.svg"
import contentIcon from "../../icons/content_icon.svg"
import createIcon from "../../icons/create_note_icon.svg"
import myContentIcon from "../../icons/mycontent_icon.svg"
import profileIcon from "../../icons/profile_icon.svg"
import logoutIcon from "../../icons/logout_icon.svg"
import sidenav from '../../reducers/sidenav';

//import {logout} from "../../actions/auth"

const Sidenav = ({closeCollabse, openCollabse, logout, sidenavPublicNotes, openSearch, sidenavMyNotes, auth: {isAuthenticated, loading, currentUser}, sidenav, history}) => {

  const openAllNotes = (e) => {
    e.preventDefault()
    if(sidenav.notesListType != 'Public Notes' && sidenav.notesListType != 'Search Public Notes'){
      sidenavPublicNotes(0)
    }else{
      openCollabse()
    }
  }

  const openMyNotes = (e) => {
    e.preventDefault()
    if(sidenav.notesListType != 'My Notes' && sidenav.notesListType != 'Search My Notes'){
      sidenavMyNotes(0)
    }else{
      openCollabse()
    }
  }


  return (
    <div>
    {
      (!loading && isAuthenticated) && 
        <Fragment>
          <div className="sidenav">
            {/*
            <Link onClick={() => openSearch()} data-tooltip="Search" data-tooltip-location="right">
              <img src={searchIcon} height="20px" width="20px" />
            </Link>
            */}
            <Link onClick={e => openMyNotes(e)} data-tooltip="My Notes" data-tooltip-location="right">
              <img className="sideNavItem" src={myContentIcon}/>
            </Link>
            <Link onClick={e => openAllNotes(e)} data-tooltip="Public Notes" data-tooltip-location="right">
              <img className="sideNavItem" src={contentIcon}/>
            </Link>
            <Link to="/notes/new" onClick={() => closeCollabse()} data-tooltip="Write a Note" data-tooltip-location="right">
              <img className="sideNavItem" src={createIcon}/>
            </Link>
            <Link to={"/users/"+currentUser.id} onClick={() => closeCollabse()} data-tooltip="My Profile" data-tooltip-location="right">
              <img className="sideNavItem" src={profileIcon}/>
            </Link>
            <Link onClick={() => logout(history)} data-tooltip="Logout" data-tooltip-location="right" className="logout">
              <img className="sideNavItem" src={logoutIcon}/>
            </Link>
          </div>
        </Fragment>
    }
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  sidenav: state.sidenav,
  listNotes: PropTypes.func.isRequired,
  myNotes: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  sidenavPublicNotes: PropTypes.func.isRequired,
  closeCollabse: PropTypes.func.isRequired,
  openCollabse: PropTypes.func.isRequired,
})

export default withRouter(connect(mapStateToProps, {
  listNotes, 
  myNotes, 
  logout, 
  sidenavPublicNotes,
  sidenavMyNotes,
  closeCollabse,
  openCollabse,
  openSearch,
})(Sidenav))
