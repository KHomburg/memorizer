import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {register} from "../../../actions/auth";
import PropTypes from 'prop-types';

const Register = ({setAlert, register, history}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const {username, email, password, password2} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    if(password !== password2){
      setAlert("Passwords do not match!", "danger")
    }else{
      register({username, email, password, password2}, history);
    }
  }

  return (
    <Fragment>
      <h5>Register</h5>
      <Form onSubmit={e=>onSubmit(e)}>
      <Form.Group controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter Username" value={username} onChange={e => onChange(e)} required/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter E-mail" value={email} onChange={e => onChange(e)} required/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} required/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Password Validation</Form.Label>
          <Form.Control type="password" name="password2" placeholder="Password validation" value={password2} onChange={e => onChange(e)} required/>
        </Form.Group>
        <Button variant="primary border-white" type="submit" value="register">
          Register
        </Button>
      </Form>
    </Fragment>
  )
}

Register.propTypes={
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, register})(Register)
