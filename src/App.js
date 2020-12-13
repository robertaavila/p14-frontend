import React from 'react';
import './App.css';
import { Auth } from './components/Login';
import { ConfirmacaoAcesso } from './components/ConfirmacaoAcesso';
import { ConfirmacaoPrimeiroAcesso } from './components/ConfirmacaoPrimeiroAcesso';
import { AlterarSenha } from './components/AlterarSenha';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated, getUsuPermissoes } from './util/login';
import AdminDashboard from "./components/AdminDashboard";
import Turma from "./components/Turma";
import Curso from "./components/Curso";
import Aluno from "./components/Aluno";
import Funcionario from "./components/Funcionario";
import NotFound from "./components/NotFound";
import StudentDashboard from "./components/StudentDashboard";
import ValidationForm from "./components/ValidationForm";

const permissoes = getUsuPermissoes();

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
              component={() => {
                if (permissoes.indexOf("dashboardAluno") > -1) {
                    return <StudentDashboard/>;
                }
                return <AdminDashboard/>;
              }} />

          {
              permissoes.indexOf("crudTurma") > -1 ?
              (<PrivateRoute 
                path="/turmas" 
                component={() => <Turma/> } />) : ''
          }

          {
              permissoes.indexOf("crudCursos") > -1 ?
              (<PrivateRoute 
                path="/cursos" 
                component={() => <Curso/> } />) : ''
          }
          
          {
              permissoes.indexOf("crudAluno") > -1 ?
              (<PrivateRoute 
              path="/alunos" 
              component={() => <Aluno/> } />) : ''
          }

          {
              permissoes.indexOf("crudAluno") > -1 ?
              (<PrivateRoute 
                path="/funcionarios" 
                component={() => <Funcionario /> } />) : ''
          }

          {
              permissoes.indexOf("visualizarProcessos") > -1 ?
              (<PrivateRoute 
                path="/processo-validacao" 
                component={() => <ValidationForm /> } />) : ''
          }

          {
              permissoes.indexOf("visualizarSomenteMeusProcessos") > -1 ?
              (<PrivateRoute 
                path="/minhas-validacoes" 
                component={() => <ValidationForm /> } />) : ''
          }

          {
              permissoes.indexOf("solicitarProcesso") > -1 ?
              (<PrivateRoute 
                path="/nova-validacao" 
                component={() => <ValidationForm /> } />) : ''
          }
              
          <Route path='*' exact component={NotFound} />
      </Switch>
  </BrowserRouter>
);

function App() {
    return (
        <div className="App">
            <Routes/>
        </div>
    )
}

export default App;
