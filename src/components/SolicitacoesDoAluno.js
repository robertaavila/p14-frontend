import React from 'react';
import Page from './Page';
import 'bulma/css/bulma.css';
import {getUrlServer} from '../util/env';
import {formatDate} from '../util/date';
import {getSeverityColorFromStatus, shortString} from '../util/style';
import {getToken, getUsuId} from '../util/login';
import StepsValidation from './StepsValidation';

class ConteudoSolicitacoesDoAluno extends React.Component {
    state = {
        list_solicitacao: [],
        modal: false,
        modalError: false,
        modalBody: 'Teste'
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
    downloadFile = (fileName) => {
        fetch(getUrlServer() + "download/" + fileName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        })
        .then(response => response.blob())
        .then((data) => {
            var file = window.URL.createObjectURL(data);
            window.open(file);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    acompanharSolicitacao = (solicitacao) => {
        this.setState({
            modal: true,
            modalBody: <StepsValidation 
                key={Math.random()}
                solicitacao={solicitacao}
                id_solicitacao_validacao={solicitacao.id_solicitacao_validacao}
                id_status_atual={solicitacao.id_status_solicitacao}
            />
        });
    }
    renderTable = () => {
        return this.state.list_solicitacao.map((solicitacao, i) => {
            const { 
                    id_solicitacao_validacao,
                    carga_horaria, 
                    data_hora_atualizacao,
                    emissor_certificado,
                    requerer_documento,
                    observacoes,
                    certificado_digital
                } = solicitacao;
            let data_atualizacao = formatDate(new Date(data_hora_atualizacao));
            let status = solicitacao["status_solicitacao.status_solicitacao"];
            let severityColor = getSeverityColorFromStatus(status);
            let atividade = solicitacao["tipo_atividade_complementar.nome"];
            return (
                <tr height="5%">
                    <td>{id_solicitacao_validacao}</td>
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
                            {(status.indexOf("Em análise") > -1 ? "Em análise" : status).toUpperCase()}
                        </span>
                    </td>
                    <td>
                        <a className="button is-white is-primary is-inverted"
                           onClick={() => this.acompanharSolicitacao(solicitacao)}>
                            <span class="icon"><i class="fas fa-eye"></i></span>
                        </a>
                    </td>
                </tr>
            );
        });
    }
    handleClose = () => {
        this.setState({modal: false})
    }
    render() {
        return (
            <div>
                <div className="column is-centered" style={{marginTop: '10px'}}>
                    <section className="hero is-info welcome is-small mb-3">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Minhas validações
                                </h1>
                                <h2 className="subtitle">
                                    Clique no icone <span class="icon" style={{verticalAlign: 'sub'}}><i class="fas fa-eye"></i></span> para acompanhar sua solicitação
                                </h2>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="tile m-3 table__wrapper">
                    <div className="tile is-vertical box">
                        <p className="title">Processos de validação</p>
                        <div className="tile is-parent is-half">
                            <div className="tile is-child box">
                                <table className="table is-fullwidth is-striped is-narrow is-hoverable
                                is-centered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tipo de Atividade</th>
                                            <th>Última atualização</th>
                                            <th>Atividade do SENAI</th>
                                            <th>Status</th>
                                            <th></th>
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
                                            <td colSpan="4">Nada encontrado</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`modal ${this.state.modal && 'is-active'}`}>
                    <div className="modal-background" onClick={this.handleClose}></div>
                    <div className="modal-content">
                        <div className={`notification ${this.state.modalError ? 'is-danger' : ''} is-light`}>
                            <button className="delete" onClick={this.handleClose}></button>
                            {this.state.modalBody}
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
export default class SolicitacoesDoAluno extends React.Component {
    render() {
        return (
            <div>
                <Page body={<ConteudoSolicitacoesDoAluno />}/>  
            </div>
        );
    }
}