import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import './styles/App.scss';

import Header from './components/layout/Header'
import Landing from './components/layout/Landing'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Alert from './components/layout/Alert'
import User from './components/pages/users/User'
import UserIndex from './components/pages/users/UserIndex'

import Note from './components/pages/notes/Note'
import CreateNote from './components/pages/notes/CreateNote'


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
          <Route exact path="/" component={Landing} />
          <section className="containter">
            <Alert />
            <Switch>
              <Route exact path="/users/register" component={Register} />
              <Route exact path="/users/login" component={Login} />
              <PrivateRoute exact path="/users" component={UserIndex} />
              <PrivateRoute exact path="/users/:id" component={User} />
              <PrivateRoute exact path="/notes/new" component={CreateNote} />
              <PrivateRoute exact path="/notes/:id" component={Note} />
              <PrivateRoute exact path="/test" component={Landing} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
