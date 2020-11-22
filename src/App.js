import React from 'react';
import './App.css';
import {Auth} from './components/Login';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {isAuthenticated} from './util/login';
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ValidationForm from "./components/ValidationForm";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ?
            (<Component {...props} />) :
            (<Redirect to={{pathname: "/acesso", state: {from: props.location}}}/>)
    )}/>
);
const LoginRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated() ?
            (<Redirect to={{pathname: "/", state: {from: props.location}}}/>) :
            (<Component {...props} />)
    )}/>
);
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <LoginRoute
                exact
                path="/acesso/"
                component={() => <Auth/>}/>

            <PrivateRoute
                path="/"
                component={() => <AdminDashboard/>}/>
        </Switch>
    </BrowserRouter>
);

function App() {
    return (
        <div className="App">
            <Auth/>
            <StudentDashboard/>
            <AdminDashboard/>
            <ValidationForm/>
        </div>
    )
}

// colocar os processos na largura da página
// listagem de processos colocar id, data e turma
// colocar horas validadas e a validar lado a lado no topo
// tirar o botao ver processos
// inserir listagem de processos abertos

export default App;
