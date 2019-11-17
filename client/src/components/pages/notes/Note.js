import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {getNote} from "../../../actions/note"
import Loading from "../../layout/Loading"

const Note = ({ getNote, note: {note, loading} }) => {
  let {id} = useParams()
  useEffect(()=>{
    note = getNote(id)
  }, [])
  return (
    <Fragment>
      {note === null || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <p>{note.title}</p>
          <p>{note.text}</p>
          <p>User Id: {note.userId}</p>
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
