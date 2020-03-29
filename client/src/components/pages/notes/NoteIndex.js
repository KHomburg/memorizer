import React, {Fragment, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import {listNotes} from "../../../actions/note"
import Loading from "../../layout/Loading"
import NoteReference from "../../shared/note/NoteReference"
import Paginate from '../../shared/paginate/Paginate'

const Notes = ({ listNotes, note: {notes, loading} }) => {
  let {page} = useParams()
  
  useEffect(()=>{
    notes = listNotes(page)
  }, [])
  return (
    <Fragment>
      {notes === [] || loading ? (
        <Fragment>
          <Loading />
        </Fragment>
      ) : (
        <Fragment>
          <div className="main-container">
            {notes.length > 0 ? (
              notes.map(note => (
                <Fragment>
                  <NoteReference key={note.id} note={note}/>
                </Fragment>
              ))
            ) : (
              null
            )}
            <Paginate page={page}/>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Notes.propTypes = {
  listNotes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note
})

export default connect(mapStateToProps, {listNotes})(Notes)