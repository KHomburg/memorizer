import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {createNote} from "../../../actions/note";
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const CreateNote = ({setAlert, createNote}) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: "",
    content: "",
  });

  const {title, text, content} = formData;
  let tags = []
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  //setting the content of from editor including formatting:
  const quillChange = (content, editor) => {
    setFormData({...formData, content: content, text: editor.getText()})
    console.log(content)
    console.log(editor.getText())
  }

  const handleChange = (newValue: any, actionMeta: any) => {
    if(newValue != null){
      tags = newValue.map(tag => tag.value).toString()
    }else{tags = []}
  };
  
  const onSubmit = async e => {
    e.preventDefault()
    createNote({title, text, tags, content});
  }

  return (
    <Fragment>
      <h5>Create a new note</h5>
      <Form onSubmit={e=>onSubmit(e)}>
        <Form.Group controlId="">
          <Form.Label>Titel</Form.Label>
          <Form.Control type="text" name="title" placeholder="Your Title" value={title} 
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="">
          <Form.Label>Text:</Form.Label>
          <ReactQuill name="text" value={content} 
            onChange={(content, delta, source, editor) => quillChange(content, editor)} 
          />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Control type="hidden" name="text" value={text}/>
        </Form.Group>     
        <CreatableSelect
          name="tags"
          isMulti
          onChange={handleChange}
        />
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
