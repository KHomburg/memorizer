import React, {Fragment, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getNote, deleteNote} from "../../../actions/note"
import Loading from "../../layout/Loading"
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import NotFound from "../../shared/404/notFound"

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
      {note.title === "" || loading ? (
        loading ? (
          <Fragment>
            <Loading />
          </Fragment>
        ) : (
          <Fragment>
            <NotFound />
          </Fragment>
        )
      ) : (
        <Fragment>
          <div className="main-container">
            <h1>{note.title}</h1>
            <div className="note-date float-right mb-2">{new Date(note.createdAt).toLocaleDateString()}</div>
            <div className="content" dangerouslySetInnerHTML={{__html: note.content}} />
            <div>{note.tags ? note.tags.map(tag => <Badge variant="secondary" className="mt-1 mb-1 mr-3">{tag.name}</Badge>) : null}</div>

            {currentUser && note.userId == currentUser.id ? (
              <Fragment>
                <Link to={`/notes/${note.id}/edit`} className="mr-5 mt-4">
                  <Button variant="primary border-white">
                    Edit this note
                  </Button>
                </Link>
                <Button variant="primary border-white float-right" onClick={handleShow}>
                  Delete this note
                </Button>
              </Fragment>
            ):(
              null
            ) }
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete this Note?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="primary border-white" onClick={handleClose}>
                No, keep it!
              </Button>
              <Button variant="primary border-white" onClick={removeNote}>
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
