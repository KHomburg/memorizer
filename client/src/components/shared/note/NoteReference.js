import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card"
import Badge from 'react-bootstrap/Badge';

const NoteReference = ({
  note: {id, title, text, user, tags, createdAt}
}) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Link to={`/notes/${id}`}>
            <Card.Title>{title}</Card.Title>
          </Link>
          <Card.Text className="preview-txt">
            {text}
          </Card.Text>
            <div>{tags ? tags.map(tag => <Badge variant="secondary" className="margin">{tag.name}</Badge>) : null}</div>
            <div className="card-date">{new Date(createdAt).toLocaleDateString()}</div>
          
        </Card.Body>
      </Card>
    </div>
  );
};

NoteReference.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteReference;