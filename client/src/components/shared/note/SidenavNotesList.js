import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import Loading from "../../layout/Loading"
import NoteReference from "./NoteReference"

const Notes = ({sidenav: {notes, loading} }) => {
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
              null
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Notes.propTypes = {
  auth: PropTypes.object.isRequired,
  sidenav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  sidenav: state.sidenav
})

export default connect(mapStateToProps)(Notes)
