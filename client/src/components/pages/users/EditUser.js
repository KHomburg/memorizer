import React, {Fragment, useState, useEffect} from 'react';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {editUser, getUser} from "../../../actions/user";
import PropTypes from 'prop-types';

const EditUser = ({setAlert, editUser, getUser, user: {user, loading}, auth: {currentUser}}) => {
  const {id} = useParams()

  useEffect(()=>{
    const userData = async (id, currentUser) => {
      user = await getUser(id)
        setFormData({
          ...formData,
          email: user.email,
          username: user.username,
          profession: user.profession,
          about: user.about
        })
    }
    userData(id, currentUser)
  }, [id])

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    profession: "",
    about: "",
  });

  

  const {email, username, profession, about} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    editUser({email, username, profession, about}, id);
  }

  return (
    <Fragment>
      {
        currentUser && user && currentUser.id == user.id ?(
          <Fragment>
            <h5>Edit Profile</h5>
            <Form onSubmit={e=>onSubmit(e)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={e => onChange(e)} />
              </Form.Group>
      
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" value={username} onChange={e => onChange(e)} />
              </Form.Group>
              <Form.Group controlId="formProfession">
                <Form.Label>Profession</Form.Label>
                <Form.Control type="text" name="profession" placeholder="Your Profession" value={profession} onChange={e => onChange(e)} />
              </Form.Group>
              <Form.Group controlId="formAbout">
                <Form.Label>About you</Form.Label>
                <Form.Control as="textarea" type="textarea" name="about" placeholder="About You" value={about} onChange={e => onChange(e)} />
              </Form.Group>
              <Button variant="primary border-white" type="submit" value="Submit">
                Submit
              </Button>
            </Form>
          </Fragment>
        ):(
          <Fragment>
            <p>
              You are not authorized to edit this profile
            </p>
          </Fragment>
        )
      }
      

    </Fragment>
  )
}

EditUser.propTypes={
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})


export default connect(mapStateToProps, {setAlert, editUser, getUser})(EditUser)
