import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {setAlert} from "../../../actions/alert";
import {login} from "../../../actions/auth";
import {resetPassword} from "../../../actions/user"
import PropTypes from 'prop-types';

//component import
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({setAlert, login, history, resetPassword}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //for login
  const {email, password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    login({email, password}, history);
  }

  //for password rest form
  const [resetPasswordEmail, setResetPasswordEmail] = useState("")
  const resetPasswordChange = e => setResetPasswordEmail(e.target.value)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const resetPasswordTrigger = () => {
    resetPassword(resetPasswordEmail)
    handleClose()
  }

  return (
    <Fragment>
      <div className="login-page">
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
          <Link href="#" onClick={handleShow}>
            <p className="mt-5">Forgotten password?</p>
          </Link>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You forgot your password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Enter your E-Mail here:</Modal.Body>
        <Form.Control type="email" name="resetPasswordEmail" placeholder="Enter your E-Mail" value={resetPasswordEmail} onChange={e => resetPasswordChange(e)} />
        <Modal.Footer>
          <Button variant="primary border-white" onClick={handleClose}>
            Back!
          </Button>
          <Button variant="primary border-white" onClick={resetPasswordTrigger}>
            Send me a new password!
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

Login.propTypes={
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, login, resetPassword})(Login)
