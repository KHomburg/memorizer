import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import {listNotes} from "../../../actions/note";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

/**
 * page: integer||string => current page (slash at start and end)
 * path: string => base path to link to
 * query: string => any additionaly query (starting with "?")
 */
const Paginate = ({page = "", path = "", query = "", listNotes}) => {
  if(page == ""){
    page = 1
  }
  return (
    <Fragment>
      <div>
        {page>1 ? (
          <Fragment>
            <p className="center">
              <Link to={`${path}${parseInt(page) - 1}${query}`} className="paginate">
                Previous
              </Link>
              <div className="paginate">
                {page}
              </div>
              <Link to={`${path}${parseInt(page) + 1}${query}`} className="paginate">
                Next
              </Link>
            </p>
          </Fragment>
        ):(
          <Fragment>
            <p className="center">
              1
              <Link to={`${path}${parseInt(page) + 1}${query}`} className="paginate">
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