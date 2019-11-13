import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import './styles/App.scss';

import Header from './components/layout/Header'
import Landing from './components/layout/Landing'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Alert from './components/layout/Alert'


//redux setup
import {Provider} from "react-redux";
import store from "./store"
//TODO: check if necessary for authentication:
import {loadUser} from "./actions/auth"

const App = () => {
  //TODO: add in authentication (maybe not here)
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
