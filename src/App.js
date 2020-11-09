import React from 'react';
import './App.css';
import { Auth } from './components/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './util/login';
import AdminDashboard from "./components/AdminDashboard";

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
const Routes = () => (
  <BrowserRouter>
      <Switch>
          <LoginRoute
              exact
              path="/acesso/"
              component={() => <Auth />} />

          <PrivateRoute 
              path="/" 
              component={() => <AdminDashboard/> } />
      </Switch>
  </BrowserRouter>
);

function App() {
    return <Routes />;
}

export default App;
