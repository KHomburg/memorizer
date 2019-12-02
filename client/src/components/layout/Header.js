import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth"

const Header = ({auth: {isAuthenticated, loading, currentUser}, logout }) => {
  return (
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
            {
              (!loading && !isAuthenticated) && 
                <Fragment>
                  <li className="nav-item">
                    <Link to="/users/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/users/register" className="nav-link">Register</Link>
                  </li>
                </Fragment>
            }
            {
              (!loading && isAuthenticated) && 
                <Fragment>
                  <li className="nav-item">
                    <Link onClick={logout} className="nav-link">Logout</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/users/"+currentUser.id} className="nav-link">My Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notes/new" className="nav-link">New Note</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notes/mynotes" className="nav-link">My Notes</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notes" className="nav-link">All Notes</Link>
                  </li>
                </Fragment>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header)
