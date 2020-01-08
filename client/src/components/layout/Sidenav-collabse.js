import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import NoteList from "../pages/notes/NoteIndex"
import searchIcon from "../../icons/search_icon.svg"
import closeIcon from "../../icons/close_icon.svg.png"


//import {logout} from "../../actions/auth"

const SidenavCollabse = () => {

  const close = () => {
    var elem = document.getElementById("sidenav-collabse");
    elem.classList.remove("collabsible-open")
  }

  return (    
    <Fragment>
      
      <div id="sidenav-collabse" className="sidenav-collabse" onClick={close}>
        <img className="close-icon" src={closeIcon} height="20px" width="20px"/>
        <h2>Headline here</h2>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="text" name="search" placeholder="Search" value={"search"} onChange={"placeholder"} required/>
        </Form.Group>
        <NoteList />
      </div>
    </Fragment>
  )
}

//Header.propTypes = {
//  logout: PropTypes.func.isRequired,
//  auth: PropTypes.object.isRequired,
//}

//  auth: state.auth
//})

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(SidenavCollabse)
