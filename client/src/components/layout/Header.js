import React, {Fragment, useState} from 'react'
import {connect} from "react-redux"

import {Link, useParams} from 'react-router-dom'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types';

//components
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';

//state actions
import {logout} from "../../actions/auth"

const Header = ({auth: {isAuthenticated, loading, currentUser}, history }) => {
  const [searchTerm, setSearchTerm] = useState({
    term: "",
  });
  const {term} = searchTerm
  const onChange = e => setSearchTerm(e.target.value)
  const onSubmit = e => {
    e.preventDefault()
    if(searchTerm){
      history.push('/notes/search/1?term=' + searchTerm)
    }else{
      history.push('')
    }
  }
  return (
    <Fragment>
    {
      (!loading && !isAuthenticated) && 
      <div>
        <div className="navbar navbar-expand-lg navbar-dark">
          <Navbar.Brand className="navbar-brand" href="/">Memorizer</Navbar.Brand>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <Nav.Link className="nav-item active">
                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
              </Nav.Link>
              <Nav.Link className="nav-item">
                <Link to="/users/login" className="nav-link">Login</Link>
              </Nav.Link>
              <Nav.Link className="nav-item">
                <Link to="/users/register" className="nav-link">Register</Link>
              </Nav.Link>
              <Form inline onSubmit={e=>onSubmit(e)}>
                <FormControl type="text" name="term" placeholder="Search" value={term} onChange={e => onChange(e)} />
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
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default withRouter(connect(mapStateToProps, {logout})(Header))
