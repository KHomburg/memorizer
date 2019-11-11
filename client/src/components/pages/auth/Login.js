import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {login} from "../../../actions/auth";
import PropTypes from 'prop-types';

const Login = ({setAlert, login}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    login({email, password});
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
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} />
        </Form.Group>
        <Button variant="primary border-white" type="submit" value="login">
          Login
        </Button>
      </Form>
    </Fragment>
  )
}

Login.propTypes={
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, login})(Login)
