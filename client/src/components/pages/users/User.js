import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getUser} from "../../../actions/user"
import Loading from "../../layout/Loading"
import Button from 'react-bootstrap/Button';

const User = ({ getUser, user: {user, loading}, auth: {currentUser} }) => {
  let {id} = useParams()
  useEffect(()=>{
    user = getUser(id)
  }, [id])
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
          {currentUser.id == id || currentUser === null ? (
            <Fragment>
              <Link to={`/users/${user.id}/edit`}>
                <Button variant="primary border-white">
                  Edit My Profile
                </Button>
              </Link>
            </Fragment>
          ): (null)}
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
