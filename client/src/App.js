import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import './styles/App.scss';

import Header from './components/layout/Header'
import Landing from './components/layout/Landing'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Route exact path="/" component={Landing} />
        <section className="containter">
          <Switch>
            <Route exact path="/users/register" component={Register} />
            <Route exact path="/users/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
