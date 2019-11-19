import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const NoteReference = ({
  note: {id, title, text, user}
}) => {
  return (
    <div>
      <Link to={`/notes/${id}`}>
        <Button variant="primary border-white">
          {title}
        </Button>
      </Link>
      <p>
        {text}
      </p>
      <p>
        Username: {user.username}
      </p>
    </div>
  );
};

NoteReference.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteReference;