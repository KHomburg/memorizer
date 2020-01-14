import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {myNotes} from "../../../actions/note"
import Loading from "../../layout/Loading"
import NoteReference from "../../shared/note/NoteReference"

const Notes = ({ myNotes, note: {notes, loading} }) => {
  useEffect(()=>{
    notes = myNotes()
  }, [])
  return (
    <Fragment>
      {notes === null || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <div>
            {notes.length > 0 ? (
              notes.map(note => (
                <Fragment>
                  <NoteReference key={note.id} note={note}/>
                </Fragment>
              ))
            ) : (
              <p>test</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Notes.propTypes = {
  myNotes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note
})

export default connect(mapStateToProps, {myNotes})(Notes)
