import React from 'react';
import './StudentDashboard.css';
import Page from './Page';
import 'bulma/css/bulma.css';
import {getUrlServer} from '../util/env';
import {formatDate} from '../util/date';
import {getSeverityColorFromStatus, shortString} from '../util/style';
import {getToken, getUsuId} from '../util/login';

class Dashboard extends React.Component {
    state = {
        list_solicitacao: [],
        total_validado: 0,
        horas_validar: 60
    }
    componentWillMount = () => {
        fetch(getUrlServer() + "solicitacao/" + getUsuId(), {
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
        this.getCountTotalValidado();
    }
    getCountTotalValidado = () => {
        let url = getUrlServer() + "aluno/total-validado/" + getUsuId();
        fetch(url, {
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
            let total = parseInt(data.total);
            let horas_validar = copyState.horas_validar - total;
            copyState['total_validado'] = total;
            copyState['horas_validar'] = (horas_validar < 0 ? 0 : horas_validar);
            this.setState(copyState);
        })
        .catch(function (error) {
            console.log('Ocorreu um erro ao realizar a requisição '+ url + ': ' + error.message);
        });
    }
    renderTable = () => {
        return this.state.list_solicitacao.map((curso, i) => {
            const { id_solicitacao_validacao, carga_horaria, data_hora_atualizacao, requerer_documento } = curso;
            let data_atualizacao = formatDate(new Date(data_hora_atualizacao));
            let status = curso["status_solicitacao.status_solicitacao"];
            let severityColor = getSeverityColorFromStatus(status);
            let atividade = curso["tipo_atividade_complementar.nome"];
            return (
                <tr>
                    <td>{id_solicitacao_validacao}</td>
                    <td>{shortString(atividade)}</td>
                    <td>{carga_horaria}</td>
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
    render() {
        return (
            <div className="">
                <div className="column is-centered" style={{marginTop: '10px'}}>
                    <section className="hero is-info welcome is-small mb-3">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Bem-vindo, Estudante.
                                </h1>
                                <h2 className="subtitle">
                                    Sistema de validação de atividades complementares SESI SENAI
                                </h2>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="tile">
                    <div className="tile is-parent is-half">
                        <article className="tile is-child notification">
                            <p className="title">Horas validadas:</p>
                            <p className="subtitle">{this.state.total_validado}</p>
                        </article>
                    </div>
                    <div className="tile is-parent is-half">
                        <article className="tile is-child notification">
                            <p className="title">Horas a validar:</p>
                            <p className="subtitle">{this.state.horas_validar}</p>
                        </article>
                    </div>
                </div>
                <div className="tile m-3">
                    <div className="tile is-vertical box">
                        <p className="title">Processos de validação</p>
                        <a
                            className="button is-medium is-info validate is-inverted"
                            href="/nova-validacao">
                                Iniciar processo de validação
                        </a>
                        <div className="tile is-parent is-half">
                            <div className="tile is-child box">
                                <table className="table is-fullwidth is-striped is-narrow is-hoverable
                                is-centered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tipo de atividade</th>
                                            <th>Carga horária</th>
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
                                     <tr>
                                        <td colSpan="6">
                                            <a href="/minhas-validacoes">Mais detalhes</a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="tile">
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child notification is-link">
                            <h1 className="title">
                                Documentação
                            </h1>
                            <a
                                className="Login-link"
                                href="https://www.in.gov.br/materia/-/asset_publisher/Kujrw0TZC2Mb/content/id/55640393/do1-2018-12-18-resolucao-n-5-de-17-de-dezembro-de-2018-55640113"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <h2>
                                    MEC - Definição de Atividades Complementares
                                </h2>
                            </a>
                            <br/>
                            <a
                                className="Login-link"
                                href="https://drive.google.com/file/d/1FkN2SYad77Zp_Vqmlh8qXp754cWJ6CG-/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <h2>SENAI - Regulamento de Atividades Complementares</h2>
                            </a>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}
export default class StudentDashboard extends React.Component {
    render() {
        return (
            <div>
                <Page body={<Dashboard />}/>    
            </div>
        );
    }
}