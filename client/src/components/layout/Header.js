import React, {Fragment, useState} from 'react'
import {connect} from "react-redux"
import Form from 'react-bootstrap/Form';
import {Link, useParams} from 'react-router-dom'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types';


//state actions
import {logout} from "../../actions/auth"
import {searchPublicNotes} from "../../actions/note"



const Header = ({auth: {isAuthenticated, loading, currentUser}, searchPublicNotes, history }) => {
  const [searchTerm, setSearchTerm] = useState({
    term: "",
  });
  const {term} = searchTerm
  const onChange = e => setSearchTerm(e.target.value)
  const onSubmit = e => {
    e.preventDefault()
    searchPublicNotes(searchTerm, history)
  }
  return (
    <Fragment>
    {
      (!loading && !isAuthenticated) && 
      <div>
        <div className="navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="/">Memorizer</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/users/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/users/register" className="nav-link">Register</Link>
              </li>
              <Form onSubmit={e=>onSubmit(e)}>
                <Form.Group controlId="formBasic">
                  <Form.Control type="text" name="term" placeholder="Search" value={term} onChange={e => onChange(e)} required/>
                </Form.Group>
              </Form>
            </ul>
          </div>
        </div>
      </div>
    }
    </Fragment>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  searchPublicNotes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  searchPublicNotes: PropTypes.func.isRequired,
})

export default withRouter(connect(mapStateToProps, {logout, searchPublicNotes})(Header))
