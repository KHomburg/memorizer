import React , {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";

const Spacer = ({auth: {loading, isAuthenticated}, sidenav}) => {
    return(
      <Fragment>
      {
        (!loading && isAuthenticated) && 
          <div className="basic-spacer"></div>
      }
      {
        (sidenav.open) && 
          <div className="collabse-spacer"></div>
      }
      </Fragment>
    )
}

Spacer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  sidenav: state.sidenav,
})

export default connect(mapStateToProps, {})(Spacer)

