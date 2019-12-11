import React, {Fragment, useState, useEffect} from 'react';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {editUser, getUser, deleteUser} from "../../../actions/user";
import PropTypes from 'prop-types';

const EditUser = ({setAlert, editUser, getUser, deleteUser, user: {user, loading}, auth: {currentUser}, history}) => {
  const {id} = useParams()
  let password = ""

  useEffect(()=>{
    const userData = async (id, currentUser) => {
      user = await getUser(id)
        setFormData({
          ...formData,
          email: user.email,
          username: user.username,
          profession: user.profession,
          about: user.about
        })
    }
    userData(id, currentUser)
  }, [id])

  //set form data
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    profession: "",
    about: "",
  });


  //updating frontend for form data changes
  const {email, username, profession, about} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    editUser({email, username, profession, about}, id);
  }

  //for user deletion form
  const [deletePassword, setDeletePassword] = useState("")
  const deletePasswordChange = e => setDeletePassword(e.target.value)

  //for deletion Modal:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const removeUser = () => deleteUser(deletePassword, id, history)

  return (
    <Fragment>
      {
        currentUser && user && currentUser.id == user.id ?(
          <Fragment>
            <h5>Edit Profile</h5>
            <Form onSubmit={e=>onSubmit(e)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={e => onChange(e)} />
              </Form.Group>
      
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" value={username} onChange={e => onChange(e)} />
              </Form.Group>
              <Form.Group controlId="formProfession">
                <Form.Label>Profession</Form.Label>
                <Form.Control type="text" name="profession" placeholder="Your Profession" value={profession} onChange={e => onChange(e)} />
              </Form.Group>
              <Form.Group controlId="formAbout">
                <Form.Label>About you</Form.Label>
                <Form.Control as="textarea" type="textarea" name="about" placeholder="About You" value={about} onChange={e => onChange(e)} />
              </Form.Group>
              <Button variant="primary border-white" type="submit" value="Submit">
                Submit
              </Button>
              <Button variant="primary border-white" onClick={handleShow}>
                Delete this Profile
              </Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this Profile?</Modal.Title>
              </Modal.Header>
              <Modal.Body>Enter you password here to delete your profile:</Modal.Body>
              <Form.Control type="text" name="deletePassword" placeholder="Enter your password" value={deletePassword} onChange={e => deletePasswordChange(e)} />
              <Modal.Footer>
                <Button variant="primary border-white" onClick={handleClose}>
                  No, keep it!
                </Button>
                <Button variant="primary border-white" onClick={removeUser}>
                  Yes, delete this Profile!
                </Button>
              </Modal.Footer>
            </Modal>
          </Fragment>
        ):(
          <Fragment>
            <p>
              You are not authorized to edit this profile
            </p>
          </Fragment>
        )
      }
      

    </Fragment>
  )
}

EditUser.propTypes={
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})


export default connect(mapStateToProps, {setAlert, editUser, getUser, deleteUser})(EditUser)
