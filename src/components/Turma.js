import React from 'react';
import 'bulma/css/bulma.css';
import Page from './Page';
import CreateClass from './CreateClass';

export default class Turma extends React.Component {
    state = {
        modal: false,
        cadastrar: false,
        editar: false,
        excluir: false,
        id: 0,
        nome: '',
        curso_id: ''
    }

    handleCloseModal = () => {
        this.setState({
            modal: false,
            cadastrar: false,
            editar: false,
            excluir: false,
            id: 0,
            nome: '',
            curso_id: ''
        });
    }

    handleShowCadastrar = () => {
        this.setState({
            modal: true,
            cadastrar: true,
            editar: false,
            excluir: false,
            id: 0,
            nome: '',
            curso_id: ''
        });
    }
    handleShowEditar = (id, nome, curso_id) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: true,
            excluir: false,
            id: id,
            nome: nome,
            curso_id: curso_id
        });
    }
    handleShowInativar = (id, nome) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: false,
            excluir: true,
            id: id,
            nome: nome
        });
    }

    render() {
        return (
            <div>
                <Page body= {(
                    <div>
                        <div className="column is-centered" style={{marginTop: '10px'}}>
                            <section className="hero is-info welcome is-small mb-3">
                                <div className="hero-body">
                                    <div className="container">
                                        <h1 className="title">
                                            Turmas
                                        </h1>
                                        <h2 className="subtitle">
                                            Nessa seção, você poderá consultar, cadastrar, editar e inativar as turmas.
                                        </h2>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="column is-1">
                            <a onClick={this.handleShowCadastrar}
                            className="button is-primary is-large">Cadastrar turma</a>
                        </div>
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
                                <div className="card-table">
                                    <div className="content table-container">
                                        <table className="table is-fullwidth is-striped is-hoverable">
                                            <thead>
                                                <th></th>
                                                <th>ID</th>
                                                <th>Nome</th>
                                                <th>Curso</th>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td width="5%">
                                                    <a onClick={() => { this.handleShowEditar(1, 'GR SADS 2019/1', 1) }}>
                                                        <i className="fa fa-edit"></i>
                                                    </a>
                                                </td>
                                                <td>1</td>
                                                <td>GR SADS 2019/1</td>
                                                <td>Análise e Desenvolvimento de Sistemas</td>
                                                <td className="level-right">
                                                    <a onClick={() => { this.handleShowInativar(1, 'GR SADS 2019/1') }}
                                                    className="button is-small is-danger">
                                                        <i className="fa fa-trash"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <footer className="card-footer">
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}/>
                { 
                    this.state.modal ? (
                        <div class="modal is-active">
                        <div class="modal-background" onClick={this.handleCloseModal}></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                            <p class="modal-card-title">
                            {
                                (this.state.cadastrar) ?
                                'Cadastrar Turma' :
                                    (this.state.editar) ?
                                    'Editar Turma' : 
                                        (this.state.excluir) ?
                                        'Inativar Turma'  : ''
                            }
                            </p>
                            <button class="delete" aria-label="close" onClick={this.handleCloseModal}></button>
                            </header>
                            <section class="modal-card-body">
                            {
                                (this.state.cadastrar) ?
                                <CreateClass /> :
                                    (this.state.editar) ?
                                    <CreateClass nome={this.state.nome} curso_id={this.state.curso_id} /> : 
                                        (this.state.excluir) ?
                                        (<p>Deseja inativar a turma <strong>{this.state.nome}</strong>?</p>) : ''
                            }
                            </section>
                            <footer class="modal-card-foot">
                            {
                                (this.state.cadastrar) ?
                                <button class="button is-success">Salvar</button> :
                                    (this.state.editar) ?
                                    <button class="button is-success">Salvar</button> : 
                                        (this.state.excluir) ?
                                        <button class="button is-success">Sim</button> : ''
                            }
                            <button class="button" onClick={this.handleCloseModal}>Cancelar</button>
                            </footer>
                        </div>
                    </div>
                    ) : ''
                }
            </div>
        );
    }
}