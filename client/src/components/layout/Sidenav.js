import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import searchIcon from "../../icons/search_icon.svg"
import contentIcon from "../../icons/content_icon.svg"

//import {logout} from "../../actions/auth"

const Sidenav = () => {
  var isOpen = false
  const open = () => {
    if(document.getElementsByClassName("collabsible-open").length > 0){
    }else{
      var elem = document.getElementById("sidenav-collabse");
      elem.classList.add("collabsible-open")
    }
  }

  return (
    <Fragment>
      <div className="sidenav">
        Search:
        <a href="#" onClick={open}>
          <img src={searchIcon} height="20px" width="20px"/>
        </a>
        Mynotes:
        <a href="#">
          <img src={contentIcon} height="20px" width="20px"/>
        </a>
        All Notes:
        <a href="#">
          <img src={contentIcon} height="20px" width="20px"/>
        </a>
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

export default connect(mapStateToProps, {})(Sidenav)
