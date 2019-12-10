import React, {Fragment, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getNote, deleteNote} from "../../../actions/note"
import Loading from "../../layout/Loading"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Note = ({ getNote, note: {note, loading}, history, deleteNote, auth: {currentUser}} ) => {
  let {id} = useParams()
  useEffect(()=>{
    note = getNote(id)
  }, [id])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const removeNote = () => deleteNote(id, history)

  return (
    <Fragment>
      {note === null || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <p>Title:    {note.title}</p>
          <p>Raw Text:   {note.text}</p>
          <p>User Id: {note.userId}</p>
          <p>Content:     </p>
          <div className="content" dangerouslySetInnerHTML={{__html: note.content}} />
          <p>Tags: {note.tags ? note.tags.map(tag => tag.name + ", ") : null}</p>

          {note.userId == currentUser.id ? (
            <Fragment>
            <Link to={`/notes/${note.id}/edit`}>
              <Button variant="primary border-white">
                Edit this note
              </Button>
            </Link>
            <Button variant="primary border-white" onClick={handleShow}>
              Delete this note
            </Button>
            </Fragment>
          ):(
            null
          ) }

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete this Note?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={removeNote}>
                Yes, delete this Note!
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      )}
    </Fragment>
  )
}

Note.propTypes = {
  getNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note
})

export default connect(mapStateToProps, {getNote, deleteNote})(Note)
