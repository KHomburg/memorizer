import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import "bootstrap"
import './styles/App.scss';

//Layout
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spacer from './components/layout/Spacer';
import Header from './components/layout/Header'
import Sidenav from "./components/layout/Sidenav"
import SidenavCollabse from "./components/layout/Sidenav-collabse"


//PAGES
import Landing from './components/layout/Landing'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Alert from './components/layout/Alert'
import User from './components/pages/users/User'
import UserIndex from './components/pages/users/UserIndex'
import EditUser from './components/pages/users/EditUser'


import Note from './components/pages/notes/Note'
import CreateNote from './components/pages/notes/CreateNote'
import NoteIndex from './components/pages/notes/NoteIndex'
import EditNote from './components/pages/notes/EditNote'
import MyNotes from './components/pages/notes/MyNotes'




//routing components
import PrivateRoute from "./components/routing/PrivateRoute" //component to check for authentication


//redux setup
import {Provider} from "react-redux";
import store from "./store"
//TODO: check if necessary for authentication:
import {loadUser} from "./actions/auth"

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Sidenav />
          <SidenavCollabse />
          <Container>
            <Row>
              <Spacer />
              <Col>
              <Route exact path="/" component={NoteIndex} />
              <section className="containter">
                <Alert />
                <Switch>
                  <Route exact path="/users/register" component={Register} />
                  <Route exact path="/users/login" component={Login} />
                  <PrivateRoute exact path="/users" component={UserIndex} />
                  <PrivateRoute exact path="/users/:id" component={User} />
                  <PrivateRoute exact path="/users/:id/edit" component={EditUser} />
                  <PrivateRoute exact path="/notes/new" component={CreateNote} />
                  <PrivateRoute exact path="/notes/mynotes" component={MyNotes} />
                  <PrivateRoute exact path="/notes/:id/edit" component={EditNote} />
                  <Route exact path="/notes/:id" component={Note} />
                  <Route exact path="/notesindex" component={NoteIndex} />
                  <Route exact path="/notesindex/:page" component={NoteIndex} />
                  <PrivateRoute exact path="/test" component={Landing} />
                </Switch>
              </section>
              </Col>
            </Row>
          </Container>
          

        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
