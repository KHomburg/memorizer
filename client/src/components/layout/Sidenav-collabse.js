import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import NoteList from "../shared/note/SidenavNotesList"
import closeIcon from "../../icons/close_icon.svg.png"


//state actions
import {searchPublicNotes} from "../../actions/note"
import {closeCollabse, searchPublicNotesSidenav, searchMyNotesSidenav, sidenavPublicNotes, sidenavMyNotes} from "../../actions/sidenav"

const SidenavCollabse = ({sidenav, sidenavPublicNotes, sidenavMyNotes, closeCollabse, searchPublicNotesSidenav, searchMyNotesSidenav, auth: {isAuthenticated, loading, currentUser}}) => {
  
  //get and set state of current pagination
  const [sidenavPaginate, setSidenavNotes] = useState(sidenav.page);

  //set loading state
  useEffect(() => {loading = loading})

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
      searchPublicNotesSidenav(searchTerm, 0)
    }else if (sidenav.notesListType == "My Notes"){
      searchMyNotesSidenav(searchTerm, 0)
    }
  }

  const close = () => {closeCollabse()}
  
  /**
   * trigger load of new notes
   */
  const getScroll = async () => {
    try{
      var loader = await document.getElementById("loader");
      var clientHeight = await window.innerHeight
      var loadNotes = 0 < (clientHeight - loader.getBoundingClientRect().bottom)
      if(!sidenav.loading && loadNotes){
        //load more notes
        switch(sidenav.notesListType){
          case "Public Notes":
            {
              sidenavPublicNotes(sidenavPaginate)
              break
            }
          case "My Notes":
            {
              sidenavMyNotes(sidenavPaginate)
              break
            }
          case "Search Public Notes":
            {
              searchPublicNotesSidenav(sidenav.term, sidenavPaginate)
              break
            }
          case "Search My Notes":
            {
              searchMyNotesSidenav(sidenav.term, sidenavPaginate)
              break
            }
        }
        setSidenavNotes(sidenavPaginate+1)
        sidenav.loading = true;
      }else if(sidenav.loading && loadNotes){
      }else if(sidenav.loading && !loadNotes){
        //notes probably loaded
        sidenav.loading = false
      }
    } catch {
      console.log("error loading more notes in sidenav")
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

          {(!sidenav.isEnd) ? (
            <div id="loader">
              <Card>
                <Card.Body>
                  <h2>loading...</h2>
                </Card.Body>
              </Card>
            </div>
            ) : (
              <div>
                <Card>
                  <Card.Body>
                    <h2>no more notes</h2>
                  </Card.Body>
                </Card>
              </div>
            )}
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
