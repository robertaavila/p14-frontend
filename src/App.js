import React from 'react';
import './App.css';
import { Auth } from './components/Login';
import { ConfirmacaoAcesso } from './components/ConfirmacaoAcesso';
import { ConfirmacaoPrimeiroAcesso } from './components/ConfirmacaoPrimeiroAcesso';
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
            <Routes/>
        </div>
    )
}

// colocar os processos na largura da página
// listagem de processos colocar id, data e turma
// colocar horas validadas e a validar lado a lado no topo
// tirar o botao ver processos
// inserir listagem de processos abertos

export default App;
