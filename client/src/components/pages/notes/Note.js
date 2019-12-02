import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getNote} from "../../../actions/note"
import Loading from "../../layout/Loading"
import Button from 'react-bootstrap/Button';

const Note = ({ getNote, note: {note, loading} }) => {
  let {id} = useParams()
  useEffect(()=>{
    note = getNote(id)
  }, [id])
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
          <p>Content:     {note.content}</p>
          <p>Tags:     {note.tags.map(tag => tag.name + ", ")}</p>
          <Link to={`/notes/${note.id}/edit`}>
            <Button variant="primary border-white">
              Edit this note
            </Button>
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

Note.propTypes = {
  getNote: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note
})

export default connect(mapStateToProps, {getNote})(Note)
