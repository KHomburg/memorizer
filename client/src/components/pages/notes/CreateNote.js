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


const CreateNote = ({setAlert, createNote, history}) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: [],
    content: "",
    isPublic: false,
  });

  const {title, text, content, isPublic, tags} = formData;
  const onChange = (e) => {setFormData({...formData, [e.target.name]: e.target.value})}
  const checkChange = (e) => setFormData({...formData, [e.target.name]: e.target.checked})

  //setting the content of from editor including formatting:
  const quillChange = (content, editor) => {
    setFormData({...formData, content: content, text: editor.getText()})
    //console.log(content)
    //console.log(editor.getText())
  }

  const handleChange = async (newValue: any, actionMeta: any) => {
    if(newValue != null){
      let newTags = await newValue.map(tag => tag.value).toString()
      setFormData({...formData, tags: newTags})
    }else{
      setFormData({...formData, tags: []})
    }
  };
  
  const onSubmit = async e => {
    e.preventDefault()
    createNote(formData, history);
  }

  return (
    <Fragment>
      <h5>Create a new note</h5>
      <div className="main-container">
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
              modules={{toolbar: [
                [{ 'header': '1'}, {'header': '2'}],
                ['bold', 'italic', 'underline', 'blockquote', "code-block"],
                [{'list': 'ordered'}, {'list': 'bullet'}, 
                {'indent': '-1'}, {'indent': '+1'}],
                ['link', /*'image'*/],
                ]}
              }
              onChange={(content, delta, source, editor) => quillChange(content, editor)} 
            />
          </Form.Group>
          <Form.Group controlId="">
            <Form.Control type="hidden" name="text" value={text}/>
          </Form.Group>     
          <CreatableSelect
            name="tags"
            isMulti
            onChange={newValue => {handleChange(newValue)}}
          />
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check style={{color: "white"}} type="checkbox" name="isPublic" label="Make this note Public" checked={isPublic} value={isPublic} onChange={e => checkChange(e)}/>
          </Form.Group>
          <Button variant="primary border-white" type="submit" value="create note">
            Create Note
          </Button>
        </Form>
      </div>
    </Fragment>
  )
}

CreateNote.propTypes={
  setAlert: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
}

export default connect(null, {setAlert, createNote})(CreateNote)
