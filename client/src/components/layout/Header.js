import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#">Memorizer</a>
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
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
