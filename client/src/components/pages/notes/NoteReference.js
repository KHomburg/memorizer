import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card"

const NoteReference = ({
  note: {id, title, text, user, tags}
}) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Link to={`/notes/${id}`}>
            <Card.Title>{title}</Card.Title>
          </Link>
          <div className="card-tags">Tags: {tags ? tags.map(tag => tag.name + ", ") : null}</div>

          <Card.Text>
            {text}
          </Card.Text>
          <Card.Link href="#">{user.username}</Card.Link>
          <Card.Link href="#">Date</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

NoteReference.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteReference;