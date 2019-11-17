import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getUser} from "../../../actions/user"
import Loading from "../../layout/Loading"

const User = ({ getUser, user: {user, loading} }) => {
  let {id} = useParams()
  useEffect(()=>{
    user = getUser(id)
  }, [])
  return (
    <Fragment>
      {user === null || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <p>{user.id}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </Fragment>
      )}
    </Fragment>
  )
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, {getUser})(User)
