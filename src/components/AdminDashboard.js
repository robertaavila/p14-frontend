import React from 'react';
import 'bulma/css/bulma.css'
import { getUsuName, logout} from '../util/login';
import Page from './Page';

let firstName = getUsuName() ? (getUsuName().trim().split(" "))[0] : '';
class Dashboard extends React.Component {
    render() {
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
                                    <p className="title">439k</p>
                                    <p className="subtitle">Usuários</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">59k</p>
                                    <p className="subtitle">Processos</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">3.4k</p>
                                    <p className="subtitle">Cursos</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">19</p>
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
