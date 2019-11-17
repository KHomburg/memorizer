import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const UserReference = ({
  user: {username, email, id}
}) => {
  return (
    <div>
      <Link to={`/users/${id}`}>
        <Button variant="primary border-white">
          {username}
        </Button>
      </Link>
      <p>
        {email}
      </p>
    </div>
  );
};

UserReference.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserReference;