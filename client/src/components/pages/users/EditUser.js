import React, {Fragment, useState, useEffect} from 'react';
import {connect} from "react-redux";
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import {setAlert} from "../../../actions/alert";
import {editUser, editUserCredentials, getUser, deleteUser} from "../../../actions/user";
import PropTypes from 'prop-types';

const EditUser = ({setAlert, editUser, editUserCredentials, getUser, deleteUser, user: {user, loading}, auth: {currentUser}, history}) => {
  const {id} = useParams()
  let password = ""

  useEffect(()=>{
    
    const userData = async (id, currentUser) => {
      user = await getUser(id)
      if(user){
        setFormData({
          ...formData,
          email: user.email,
          username: user.username,
          profession: user.profession,
          about: user.about,
          oldPassword: user.oldPassword,
          newPassword: user.newPassword,
          confirmPassword: user.confirmPassword,
        })
      }
    }
    userData(id, currentUser)
  }, [id])

  //set form data
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    profession: "",
    about: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  //updating frontend for form data changes
  const {email, username, profession, about, oldPassword, newPassword, confirmPassword} = formData;
  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const onSubmitGeneral = async e => {
    e.preventDefault()
    editUser({username, profession, about}, id);
  }

  const onSubmitCredentials = async e => {
    e.preventDefault()
    if(newPassword === confirmPassword){
      editUserCredentials({email, oldPassword, newPassword}, id);
    }else{
      setAlert("New password and confirmation do not match!", "danger")
    }
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
            <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
              <Tab eventKey="general" title="General">
                <Form onSubmit={e=>onSubmitGeneral(e)}>          
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
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
                </Form>
              </Tab>

              <Tab eventKey="loginData" title="Login Data">
                <Form onSubmit={e=>onSubmitCredentials(e)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={e => onChange(e)} />
                  </Form.Group>
          
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Your current password</Form.Label>
                    <Form.Control type="password" name="oldPassword" placeholder="Current password" value={oldPassword} onChange={e => onChange(e)} />
                  </Form.Group>
                  <Form.Group controlId="formProfession">
                    <Form.Label>Your new password</Form.Label>
                    <Form.Control type="password" name="newPassword" placeholder="New password" value={newPassword} onChange={e => onChange(e)} />
                  </Form.Group>
                  <Form.Group controlId="formProfession">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={e => onChange(e)} />
                  </Form.Group>
                  <Button variant="primary border-white" type="submit" value="Submit">
                    Submit
                  </Button>
                  <Button variant="primary border-white" className="deleteProfileButton" onClick={handleShow}>
                    Delete this Profile
                  </Button>
                </Form>
              </Tab>
            </Tabs>
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
  editUserCredentials: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})


export default connect(mapStateToProps, {setAlert, editUser, editUserCredentials, getUser, deleteUser})(EditUser)
