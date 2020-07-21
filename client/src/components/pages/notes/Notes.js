import React, {Fragment, useEffect, useState, useLayoutEffect} from 'react'
import {Link, useParams, history} from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import Loading from "../../layout/Loading"
import NoteReference from "../../shared/note/NoteReference"
import Paginate from '../../shared/paginate/Paginate'

//state actions
import {searchPublicNotes, listNotes} from "../../../actions/note"

const Notes = ({ searchPublicNotes, note: {notes, loading}, location, history }) => {

  let {page} = useParams()

  //TODO: refactor following function, because it requires the search term to be the first query param
  let term = location.search.split('=')[1].split('&')[0]
  const path = "/notes/search/"
  const query = `?term=${term}`

  useEffect(()=>{
    term = location.search.split('=')[1].split('&')[0]
    notes = searchPublicNotes(term, page)

    //forcing state refresh and rerender upon page change through pagination
    return history.listen((location) => {
      term = location.search.split('=')[1]
      term ? term = term.split('&')[0] : term = term
      page = location.pathname.split('/')[3]
      notes = searchPublicNotes(term, page)
    })
  }, [history])

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
            <Paginate page={page} path={path} query={query}/>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
//'/notes/search/1?term=' + searchTerm

Notes.propTypes = {
  auth: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  searchPublicNotes: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note,
  searchPublicNotes: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {listNotes, searchPublicNotes})(Notes)