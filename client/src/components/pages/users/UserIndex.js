import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {listUsers} from "../../../actions/user"
import Loading from "../../layout/Loading"
import UserReference from "./UserReference"

const Users = ({ listUsers, user: {users, loading} }) => {
  useEffect(()=>{
    users = listUsers()
  }, [])
  return (
    <Fragment>
      {users === null || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <div>
            {users.length > 0 ? (
              users.map(user => (
                <UserReference key={user.id} user={user}/>
              ))
            ) : (
              <p>test</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Users.propTypes = {
  listUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, {listUsers})(Users)
