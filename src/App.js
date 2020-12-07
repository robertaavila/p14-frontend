import React from 'react';
import './App.css';
import { Auth } from './components/Login';
import { ConfirmacaoAcesso } from './components/ConfirmacaoAcesso';
import { ConfirmacaoPrimeiroAcesso } from './components/ConfirmacaoPrimeiroAcesso';
import { AlterarSenha } from './components/AlterarSenha';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './util/login';
import AdminDashboard from "./components/AdminDashboard";
import Turma from "./components/Turma";
import Curso from "./components/Curso";
import Aluno from "./components/Aluno";
import Funcionario from "./components/Funcionario";
import NotFound from "./components/NotFound";
import StudentDashboard from "./components/StudentDashboard";
import ValidationForm from "./components/ValidationForm";
import {ForgotPassword} from "./components/ForgotPassword";
import StepsValidation from "./components/StepsValidation";
import BarChart from "./components/BarChart";
import BubbleChart from "./components/PieChart";
import DoughnutChart from "./components/LineChart";
import PieChart from "./components/PieChart";

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

          <Route
              exact
              path="/acesso/confirmacao/:secret"
              component={ConfirmacaoAcesso} />

          <Route
              exact
              path="/acesso/primeiro_acesso/:secret"
              component={ConfirmacaoPrimeiroAcesso} />

          <Route
              exact
              path="/acesso/alterar_senha/:secret"
              component={AlterarSenha} />

          <PrivateRoute 
              exact
              path="/" 
              component={() => <AdminDashboard/> } />

          <PrivateRoute 
              path="/turmas" 
              component={() => <Turma/> } />

          <PrivateRoute 
              path="/cursos" 
              component={() => <Curso/> } />

          <PrivateRoute 
              path="/alunos" 
              component={() => <Aluno/> } />

          <PrivateRoute 
              path="/funcionarios" 
              component={() => <Funcionario /> } />
              
          <Route path='*' exact component={NotFound} />
      </Switch>
  </BrowserRouter>
);

function App() {
    return (
        <div className="App">
            <PieChart/>
        </div>
    )
}

export default App;
