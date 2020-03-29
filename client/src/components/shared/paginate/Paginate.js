import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import {listNotes} from "../../../actions/note";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Paginate = ({page, listNotes}) => {
  if(page == undefined){
    page = 1
  }
  return (
    <Fragment>
      <div>
        {page>1 ? (
          <Fragment>
            <p className="center">
              <Link to={`/notesindex/${parseInt(page) - 1}`} className="paginate" onClick={() => listNotes(parseInt(page)-1)}>
                Previous
              </Link>
              <div className="paginate">
                {page}
              </div>
              <Link to={`/notesindex/${parseInt(page) + 1}`} className="paginate" onClick={() => listNotes(parseInt(page)+1)}>
                Next
              </Link>
            </p>
          </Fragment>
        ):(
          <Fragment>
            <p className="center">
              1
              <Link to={`/notesindex/${2}`} className="paginate" onClick={() => listNotes(2)}>
                Next
              </Link>
            </p>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Paginate.propTypes = {
  page: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  note: state.note,
  listNotes: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {listNotes})(Paginate);