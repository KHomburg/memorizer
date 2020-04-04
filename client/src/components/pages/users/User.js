import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getUser} from "../../../actions/user"
import Loading from "../../layout/Loading"
import NotFound from "../../shared/404/notFound"
import Button from 'react-bootstrap/Button';


//Layout
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const User = ({ getUser, user: {user, loading}, auth: {currentUser}}) => {
  let {id} = useParams()
  useEffect(()=>{
    user = getUser(id)
  }, [id])
  return (
    <Fragment>
      {user === null || loading ? (
        loading ? (
          <Fragment>
            <Loading />
          </Fragment>
        ) : (
          <Fragment>
            <NotFound />
          </Fragment>
        )
      ) : (
        <Fragment>
          <Container>
            <Row>
              <Col lg="2"></Col>
              <Col>
                <div className="profile-head">
                  <h3>{user.username}</h3>
                </div>

                <div className="profile-profession">
                  <p>{user.profession}</p>
                </div>
                
                <div className="profile-about">
                  <p>{user.about}</p>
                </div>

                {currentUser != null && currentUser.id == id ? (
                  <Fragment>
                    <Link to={`/users/${user.id}/edit`}>
                      <Button variant="primary border-white">
                        Edit My Profile
                      </Button>
                    </Link>
                  </Fragment>
                ): (null)}
                </Col>
                <Col lg="2"></Col>
              </Row>
            </Container>
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
