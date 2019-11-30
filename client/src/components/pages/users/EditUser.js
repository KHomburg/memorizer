import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {editUser} from "../../../actions/user";
import PropTypes from 'prop-types';

const EditUser = ({setAlert, editUser}) => {
  let {id} = useParams()

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
      <h5>Login Form</h5>
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
  )
}

EditUser.propTypes={
  setAlert: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, editUser})(EditUser)
