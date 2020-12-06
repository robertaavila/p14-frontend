import React from 'react';
import 'bulma/css/bulma.css';
import Page from './Page';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';

export default class Curso extends React.Component {
    state = {
        modal: false,
        cadastrar: false,
        editar: false,
        excluir: false,
        error: '',
        sucesso: '',
        id: 0,
        nome: '',
        list_cursos: []
    }

    handleCloseModal = () => {
        this.setState({
            modal: false,
            cadastrar: false,
            editar: false,
            excluir: false,
            error: '',
            sucesso: '',
            id: 0,
            nome: ''
        });
    }

    handleShowCadastrar = () => {
        this.setState({
            modal: true,
            cadastrar: true,
            editar: false,
            excluir: false,
            error: '',
            sucesso: '',
            id: 0,
            nome: ''
        });
    }
    handleShowEditar = (id, nome) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: true,
            excluir: false,
            error: '',
            sucesso: '',
            id: id,
            nome: nome
        });
    }
    handleShowInativar = (id, nome) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: false,
            excluir: true,
            error: '',
            sucesso: '',
            id: id,
            nome: nome
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        fetch(getUrlServer() + "curso", {
            method: (this.state.cadastrar ? 'POST' : 'PUT'),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            },
            body: JSON.stringify({nome: this.state.nome, ativo: (this.state.excluir ? 'N' : 'S'), id_curso: this.state.id})
        })
        .then(response => response.json())
        .then((data) => {
            if (typeof data.errors != 'undefined') {
                this.setState({
                    error: data.errors[0].msg,
                    sucesso: ''
                });
                return;
            }
            this.setState({
                nome: '',
                error: '',
                sucesso: (this.state.cadastrar ? 'Curso cadastrado!' : this.state.editar ? 'Curso editado!' : 'Curso inativado!')
            });
            this.componentWillMount();
            setTimeout(() => {
                this.handleCloseModal();
            }, 2500);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }

    componentWillMount = () => {
        fetch(getUrlServer() + "curso", {
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
            copyState.list_cursos = data;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }

    renderTable = () => {
        return this.state.list_cursos.map((curso, i) => {
            const { id_curso, nome } = curso;
            return (
                <tr id={id_curso}>
                    <td width="5%"> 
                        <a onClick={() => { this.handleShowEditar(id_curso, nome) }}> 
                            <i className="fa fa-edit"></i> 
                        </a> 
                    </td> 
                    <td>{id_curso}</td> 
                    <td>{nome}</td> 
                    <td className="level-right"> 
                        <a onClick={() => { this.handleShowInativar(id_curso, nome) }} 
                        className="button is-small is-danger"> 
                        <i className="fa fa-trash"></i> 
                        </a> 
                    </td> 
                </tr>
            );
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
                                            Cursos
                                        </h1>
                                        <h2 className="subtitle">
                                            Nessa seção, você poderá consultar, cadastrar, editar e inativar os cursos.
                                        </h2>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="column is-1">
                            <a onClick={this.handleShowCadastrar}
                            className="button is-primary is-large">Cadastrar</a>
                        </div>
                        <div className="column is-12">
                            <div className="card events-card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Cursos
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
                                                <th></th>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.list_cursos.length > 0 ?
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
                                'Cadastrar' :
                                    (this.state.editar) ?
                                    'Editar' : 
                                        (this.state.excluir) ?
                                        'Inativar'  : ''
                            }
                            </p>
                            <button class="delete" aria-label="close" onClick={this.handleCloseModal}></button>
                            </header>
                            <section class="modal-card-body">
                            <form id="form-curso" onSubmit={this.onSubmit}>
                            {
                                (this.state.cadastrar || this.state.editar) ?
                                (
                                    <div style={{textAlign: 'initial'}}>
                                        <div className="field">
                                            <label className="label">Nome</label>
                                            <div className="control">
                                                <input value={this.state.nome} onChange={this.onChange} className="input" name="nome" type="text" placeholder="Informe o nome do curso" />
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (this.state.excluir) ?
                                    (<p>Deseja inativar o curso <strong>{this.state.nome}</strong>?</p>) : ''
                            }
                            {
                                (this.state.error != '') ?
                                    (
                                        <div class="notification is-danger is-light">
                                            {this.state.error}
                                        </div>
                                    ) : ''
                            }
                            {
                                (this.state.sucesso != '') ?
                                    (
                                        <div class="notification is-success is-light">
                                            {this.state.sucesso}
                                        </div>
                                    ) : ''
                            }
                            </form>
                            </section>
                            <footer class="modal-card-foot">
                            {
                                (this.state.cadastrar) ?
                                <button class="button is-success" onClick={this.onSubmit}>Salvar</button> :
                                    (this.state.editar) ?
                                    <button class="button is-success" onClick={this.onSubmit}>Salvar</button> :
                                        (this.state.excluir) ?
                                        <button class="button is-success" onClick={this.onSubmit}>Sim</button> : ''
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