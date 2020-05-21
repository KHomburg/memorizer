import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {login} from "../../../actions/auth";
import PropTypes from 'prop-types';

const Login = ({setAlert, login, history}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    login({email, password}, history);
  }

  return (
    <Fragment>
      <h5>Login Form</h5>
      <Form onSubmit={e=>onSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={e => onChange(e)} required/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} required/>
        </Form.Group>
        <Button variant="primary border-white" type="submit" value="login">
          Login
        </Button>
        <Link href="#">
          <p>Forgotten password?</p>
        </Link>
      </Form>
    </Fragment>
  )
}

Login.propTypes={
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, login})(Login)
