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
import {closeCollabse} from "../../actions/sidenav"


//import {logout} from "../../actions/auth"

const SidenavCollabse = ({sidenav, searchPublicNotes, closeCollabse, auth: {isAuthenticated, loading, currentUser},}) => {
  const [searchTerm, setSearchTerm] = useState({
    term: "",
  });

  const {term} = searchTerm
  const onChange = e => setSearchTerm(e.target.value)
  const onSubmit = async e => {
    e.preventDefault()
    searchPublicNotes(searchTerm)
  }

  const close = () => {
    closeCollabse()
  }

  //TODO: switch for which search should be performed

  return (    
    <Fragment>
      {
        (!loading && isAuthenticated && sidenav.open) && 
        <div id="sidenav-collabse" className="sidenav-collabse collabsible-open">
          <img className="close-icon" src={closeIcon} onClick={close} height="20px" width="20px"/>
          <h2>{sidenav.notesListType}</h2>
          
          <Form onSubmit={e=>onSubmit(e)}>
            <Form.Group controlId="formBasic">
              <Form.Control type="text" name="term" placeholder="Search" value={term} onChange={e => onChange(e)} required/>
            </Form.Group>
          </Form>

          <NoteList />
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
})

export default connect(mapStateToProps, {searchPublicNotes, closeCollabse})(SidenavCollabse)
