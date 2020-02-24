import React, {Fragment, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {updateNote, getNote} from "../../../actions/note";
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Loading from "../../layout/Loading"


const EditNote = ({setAlert, updateNote, getNote, note: {note, loading}}) => {
  let [formData, setFormData] = useState({
        title: note.title,
        text: note.text,
        content: note.content,
        tags: note.tags.map(tag => {return {label: tag.name, value: tag.name}}),
        isPublic: Boolean(note.isPublic)
  });
  let {id} = useParams()

  useEffect(() =>{
    const noteData = async () => {
      note = await getNote(id)
      setFormData(
        {
          ...formData,
          title: note.title,
          text: note.text,
          content: note.content,
          tags: note.tags.map(tag => {return {label: tag.name, value: tag.name}}),
          isPublic: Boolean(note.isPublic)
        }
      )
    }
    noteData()
  }, [id])

  const {title, text, content, tags, isPublic} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const quillChange = (content, editor) => {
    formData.content = content
    formData.text = editor.getText()
  }
  const checkChange = (e) => setFormData({...formData, [e.target.name]: e.target.checked})
  
  const handleChange = (newValue: any, actionMeta: any) => {
    if(newValue != null){
      setFormData({...formData, tags: newValue})
    }else{tags = []}
  };
  
  const onSubmit = async e => {
    e.preventDefault()
    updateNote({...formData, tags: formData.tags.map(tag => tag.value).toString()}, id);
  }

  return (
    <Fragment>
      {note === null || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ): (
        <Fragment>
          <h5>Edit your Note</h5>
          <div className="main-container">
            <Form onSubmit={e=>onSubmit(e)}>
              <Form.Group controlId="">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} 
                  onChange={title => onChange(title)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="">
                <Form.Label>Text:</Form.Label>
                <ReactQuill name="content" value={content}
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
                value={tags}
                isMulti
                onChange={handleChange}
              />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check style={{color: "white"}} type="checkbox" name="isPublic" label="Make this note Public" checked={isPublic} value={isPublic} onChange={e => checkChange(e)}/>
              </Form.Group>
              <Button variant="primary border-white" type="submit" value="create note">
                Update note
              </Button>
            </Form>
          </div>
        </Fragment>
      ) }
    </Fragment>
  )
}

EditNote.propTypes={
  getNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  //auth: state.auth,
  note: state.note
})

export default connect(mapStateToProps, {setAlert, updateNote, getNote})(EditNote)
