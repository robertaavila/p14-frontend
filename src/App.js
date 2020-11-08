import React from 'react';
import './App.css';
import { Auth } from './components/Login'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated, getUsuName, logout} from './util/login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest} render={props => (
      isAuthenticated() ?
      (<Component {...props} />) :
      (<Redirect to={{ pathname: "/acesso", state: {from: props.location} }} />)
  )} />
);
const LoginRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      isAuthenticated() ?
      (<Redirect to={{ pathname: "/", state: {from: props.location} }} />) : 
      (<Component {...props} />)
  )} />
);
let firstName = getUsuName() ? (getUsuName().trim().split(" "))[0] : '';
const Routes = () => (
  <BrowserRouter>
      <Switch>
          <LoginRoute
              exact
              path="/acesso/"
              component={() => <Auth />} />

          <PrivateRoute 
              path="/" 
              component={() => <div>
                  <div style={{color: "white", textAlign: "center", paddingTop: '10%', fontSize: "80px"}}>
                    Bem vindo, {firstName}!
                  </div>
                </div>
              } />
      </Switch>
  </BrowserRouter>
);

function App() {
  return <Routes />
}

export default App;
