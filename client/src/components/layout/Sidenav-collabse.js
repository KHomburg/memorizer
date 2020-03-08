import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import NoteList from "../shared/note/SidenavNotesList"
import searchIcon from "../../icons/search_icon.svg"
import closeIcon from "../../icons/close_icon.svg.png"

//state actions
import {searchPublicNotes} from "../../actions/note"
import {closeCollabse, searchPublicNotesSidenav, searchMyNotesSidenav, sidenavPublicNotes, sidenavMyNotes} from "../../actions/sidenav"


//import {logout} from "../../actions/auth"

const SidenavCollabse = ({sidenav, sidenavPublicNotes, sidenavMyNotes, closeCollabse, searchPublicNotesSidenav, searchMyNotesSidenav, auth: {isAuthenticated, loading, currentUser}}) => {
  
  //get and set state of current pagination
  //const [sidenavPaginate, setSidenavNotes] = useState(1);
  const [sidenavPaginate, setSidenavNotes] = useState(sidenav.page);


  //set term for search
  const [searchTerm, setSearchTerm] = useState({
    term: "",
  });
  const {term} = searchTerm
  const onChange = e => setSearchTerm(e.target.value)

  //search notes depending on which type of notes the sidenav currently displays
  const searchNotes = async e => {
    e.preventDefault()
    if(sidenav.notesListType == "Public Notes"){
      searchPublicNotesSidenav(searchTerm)
    }else if (sidenav.notesListType == "My Notes"){
      searchMyNotesSidenav(searchTerm)
    }
  }

  const close = () => {
    closeCollabse()
  }

  
  /**
   * trigger load of new notes
   */
  var loading = false
  const getScroll = async () => {
    try{
      var loader = await document.getElementById("loader");
      var clientHeight = await window.innerHeight
      var loadNotes = 0 < (clientHeight - loader.getBoundingClientRect().bottom)

      //TODO: also set a loading notes states to prevent many unnecessary requests
      if(!loading && loadNotes){
        //set loading state to loading
        //increase state of page by 1
        //get type of notesList
        //load more notes
        loading = true
        sidenavPublicNotes(sidenavPaginate)
        
        //increase pagination
        setSidenavNotes(sidenavPaginate+1)
        

        
        //console.log("start loading")
      }else if(loading && loadNotes){
        //do nothing
        //console.log("still loading")
      }else if(loading && !loadNotes){
        //notes probably loaded
        loading = false
      }
    } catch {
      console.log("error scolling sidenav")
    }

  }


  //TODO: switch for which search should be performed

  return (    
    <Fragment>
      {
        (!loading && isAuthenticated && sidenav.open) && 
        <div id="sidenav-collabse" className="sidenav-collabse collabsible-open" onScroll={e => getScroll()}>
          <img className="close-icon" src={closeIcon} onClick={close} height="20px" width="20px"/>
          <h2>{sidenav.notesListType}</h2>
          {(sidenav.notesListType == "Public Notes") ? (
            <Form onSubmit={e=>searchNotes(e)}>
              <Form.Group controlId="formBasic">
                <Form.Control type="text" name="term" placeholder="Search" value={term} onChange={e => onChange(e)} required/>
              </Form.Group>
            </Form>) : null
          }
          {(sidenav.notesListType == "My Notes") ? (
            <Form onSubmit={e=>searchNotes(e)}>
              <Form.Group controlId="formBasic">
                <Form.Control type="text" name="term" placeholder="Search" value={term} onChange={e => onChange(e)} required/>
              </Form.Group>
            </Form>) : null
          }

          <NoteList />

          <div id="loader">
            <h2>
              loading...
            </h2>
          </div>
        </div>
      }
      </Fragment>
  )
}

SidenavCollabse.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  sidenav: state.sidenav,
  searchPublicNotes: PropTypes.func.isRequired,
  closeCollabse: PropTypes.func.isRequired,
  searchPublicNotesSidenav: PropTypes.func.isRequired,
  searchMyNotesSidenav: PropTypes.func.isRequired,
  sidenavPublicNotes: PropTypes.func.isRequired,
  searchMyNotesSidenav: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {searchPublicNotes, closeCollabse, searchPublicNotesSidenav, searchMyNotesSidenav, sidenavPublicNotes, sidenavMyNotes})(SidenavCollabse)
