import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import './styles/App.scss';
import Button from 'react-bootstrap/Button';
import Header from './components/layout/Header'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

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
        <h1>Test</h1>
        <Button className= "primary border-white">Primary</Button>
      </Fragment>
    </Router>
  );
}

export default App;
