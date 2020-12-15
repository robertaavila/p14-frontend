import React from 'react';
import 'bulma/css/bulma.css'
import { getUsuName, logout} from '../util/login';
import Page from './Page';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';
import {formatDate} from '../util/date';
import {getSeverityColorFromStatus, shortString} from '../util/style';

let firstName = getUsuName() ? (getUsuName().trim().split(" "))[0] : '';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turmaCount: 0,
            alunoCount: 0,
            processosCount: 0,
            cursosCount: 0,
            list_solicitacao: []
        }
    }

    componentWillMount = () => {
        this.getCounts("curso/total", "cursosCount");
        this.getCounts("aluno/total", "alunoCount");
        this.getCounts("turma/total", "turmaCount");
        this.getCounts("solicitacao/total", "processosCount");
        this.getSolicitacoes();
    }

    getSolicitacoes = () => {
        fetch(getUrlServer() + "solicitacao/", {
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
            let total = data.length;
            if (data.length > 3) total = 3;
            let new_list_solicitacao = [];
            for (let i = 0; i < total; i++) {
                new_list_solicitacao.push(data[i]);
            }
            copyState.list_solicitacao = new_list_solicitacao;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }

    renderTable = () => {
        console.log(this.state.list_solicitacao);
        return this.state.list_solicitacao.map((curso, i) => {
            const { id_solicitacao_validacao, carga_horaria, data_hora_atualizacao, requerer_documento } = curso;
            let data_atualizacao = formatDate(new Date(data_hora_atualizacao));
            let status = curso["status_solicitacao.status_solicitacao"];
            let usuNome = curso["usuario.nome"];
            let severityColor = getSeverityColorFromStatus(status);
            let atividade = curso["tipo_atividade_complementar.nome"];
            return (
                <tr>
                    <td>{id_solicitacao_validacao}</td>
                    <td>{shortString(usuNome)}</td>
                    <td>{shortString(atividade)}</td>
                    <td>{data_atualizacao}</td>
                    <td>
                         {
                            requerer_documento == 'S' ?
                            (<span class="tag is-white is-success">
                                SIM
                             </span>) :
                            (<span class="tag is-white is-danger">
                                NÃO
                            </span>)
                        }
                    </td>
                    <td>
                        <span class="tag is-white" style={{background: severityColor, color: 'white'}}>
                            {status.toUpperCase()}
                        </span>
                    </td>
                </tr>
            );
        });
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
                        <div className="column is-12">
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
                                <div className="card-table table__wrapper">
                                    <div className="content">
                                        <table className="table is-fullwidth is-striped is-hoverable">
                                        <thead>
                                        <tr>
                                                <th>ID</th>
                                                <th>Aluno</th>
                                                <th>Tipo de atividade</th>
                                                <th>Última atualização</th>
                                                <th>Atividade do SENAI</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.list_solicitacao.length > 0 ?
                                            (
                                                this.renderTable()
                                            ) :
                                            (
                                                <tr>
                                                <td colSpan="6">Nada encontrado</td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                        </table>
                                        <footer className="card-footer">
                                            <a href="/processo-validacao" className="card-footer-item">Ver todos</a>
                                        </footer>
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
