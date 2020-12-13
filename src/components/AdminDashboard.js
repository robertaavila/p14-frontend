import React from 'react';
import 'bulma/css/bulma.css'
import { getUsuName, logout} from '../util/login';
import Page from './Page';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';

let firstName = getUsuName() ? (getUsuName().trim().split(" "))[0] : '';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turmaCount: 0,
            alunoCount: 0,
            processosCount: 0,
            cursosCount: 0,
        }
    }

    componentWillMount = () => {
        this.getCounts("curso/total", "cursosCount");
        this.getCounts("aluno/total", "alunoCount");
        this.getCounts("turma/total", "turmaCount");
        this.getCounts("solicitacao/total", "processosCount");
        console.log(this.state)
    }

    getCounts = (url, stateName) => {
        fetch(getUrlServer() + url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        })
            .then(response => response.json())
            .then((data) => {
                let copyState = this.state;
                copyState[stateName] = data.total;
                this.setState(copyState);
            })
            .catch(function (error) {
                console.log('Ocorreu um erro ao realizar a requisição '+ url + ': ' + error.message);
            });
    }

    render() {
        const { cursosCount, alunoCount, turmaCount, processosCount } = this.state
        return (
            <div className="columns">
                <div className="column  is-centered" style={{marginTop: '10px'}}>
                    <section className="hero is-info welcome is-small mb-3">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Bem-vindo, Colaborador {firstName}.
                                </h1>
                                <h2 className="subtitle">
                                    Sistema de validação de atividades complementares SESI SENAI
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className="info-tiles">
                        <div className="tile is-ancestor has-text-centered">
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">{alunoCount}</p>
                                    <p className="subtitle">Usuários</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">{processosCount}</p>
                                    <p className="subtitle">Processos em andamento</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">{cursosCount}</p>
                                    <p className="subtitle">Cursos</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">{turmaCount}</p>
                                    <p className="subtitle">Turmas</p>
                                </article>
                            </div>
                        </div>
                    </section>
                    <div className="columns">
                        <div className="column is-6">
                            <div className="card events-card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Processos de validação
                                    </p>
                                    <a href="#" className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                    </a>
                                </header>
                                <div className="card-table">
                                    <div className="content">
                                        <table className="table is-fullwidth is-striped is-hoverable">
                                            <tbody>
                                            <tr>
                                                <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                <td>Processo 2</td>
                                                <td>Status: em análise</td>
                                                <td>Turma: 2019/1</td>
                                                <td className="level-right"><a
                                                    className="button is-small is-primary" href="#">Abrir</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                <td>Processo 2</td>
                                                <td>Status: em análise</td>
                                                <td>Turma: 2018/1</td>
                                                <td className="level-right"><a
                                                    className="button is-small is-primary" href="#">Abrir</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                <td>Processo 2</td>
                                                <td>Status: em análise</td>
                                                <td>Turma: 2020/1</td>
                                                <td className="level-right"><a
                                                    className="button is-small is-primary" href="#">Abrir</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                <td>Processo 2</td>
                                                <td>Status: em análise</td>
                                                <td>Turma: 2018/1</td>
                                                <td className="level-right"><a
                                                    className="button is-small is-primary" href="#">Abrir</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="5%"><i className="fa fa-bell-o"></i></td>
                                                <td>Processo 2</td>
                                                <td>Status: em análise</td>
                                                <td>Turma: 2020/1</td>
                                                <td className="level-right"><a
                                                    className="button is-small is-primary" href="#">Abrir</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <footer className="card-footer">
                                            <a href="#" className="card-footer-item">Ver todos</a>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="card mb-3">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Buscar turma
                                    </p>
                                    <a href="#" className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                    </a>
                                </header>
                                <div className="card-content pb-1">
                                    <div className="content">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-half" type="text"
                                                    placeholder=""></input>
                                            <button className="button is-small is-info validate mt-2">Buscar
                                            </button>
                                            <span className="icon is-medium is-left">
                                                <i className="fa fa-search"></i>
                                            </span>
                                            <span className="icon is-medium is-right">
                                                <i className="fa fa-check"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Buscar usuário
                                    </p>
                                    <a href="#" className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                    </a>
                                </header>
                                <div className="card-content pb-1">
                                    <div className="content">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input" type="text"
                                                   placeholder=""></input>
                                            <button className="button is-small is-info validate mt-2">Buscar
                                            </button>
                                            <span className="icon is-medium is-left">
                                                    <i className="fa fa-search"></i>
                                            </span>
                                            <span className="icon is-medium is-right">
                                                <i className="fa fa-check"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default class AdminDashboard extends React.Component {
    render() {
        return (
            <div>
                <Page body={<Dashboard />}/>    
            </div>
        );
    }
}
