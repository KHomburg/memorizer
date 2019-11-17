import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {createNote} from "../../../actions/note";
import PropTypes from 'prop-types';

const CreateNote = ({setAlert, createNote}) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const {title, text} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    createNote({title, text});
  }

  return (
    <Fragment>
      <h5>Login Form</h5>
      <Form onSubmit={e=>onSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" name="title" placeholder="Your Title" value={title} onChange={e => onChange(e)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Text:</Form.Label>
          <Form.Control type="text" name="text" placeholder="Your Text" value={text} onChange={e => onChange(e)} />
        </Form.Group>
        <Button variant="primary border-white" type="submit" value="create note">
          Create Note
        </Button>
      </Form>
    </Fragment>
  )
}

CreateNote.propTypes={
  setAlert: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, createNote})(CreateNote)