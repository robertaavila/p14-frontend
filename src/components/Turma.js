import React from 'react';
import 'bulma/css/bulma.css';
import Page from './Page';
import CreateClass from './CreateClass';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';

export default class Turma extends React.Component {
    state = {
        modal: false,
        cadastrar: false,
        editar: false,
        excluir: false,
        error: '',
        sucesso: '',
        id: 0,
        nome: '',
        curso_id: '',
        list_turmas: [],
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
            error: '',
            sucesso: '',
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
            error: '',
            sucesso: '',
            id: id,
            nome: nome,
            curso_id: curso_id
        });
    }
    handleShowInativar = (id, nome, curso_id) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: false,
            excluir: true,
            error: '',
            sucesso: '',
            id: id,
            nome: nome,
            curso_id: curso_id
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    componentWillMount = () => {
        this.getTurmas();
        this.getCursos();
    }

    getTurmas = () => {
        fetch(getUrlServer() + "turma", {
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
            copyState.list_turmas = data;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }

    getCursos = () => {
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
        return this.state.list_turmas.map((turma, i) => {
            const { id_curso, id_turma, nome } = turma;
            return (
                <tr id={id_curso}>
                    <td width="5%"> 
                        <a onClick={() => { this.handleShowEditar(id_turma, nome, id_curso) }}> 
                            <i className="fa fa-edit"></i> 
                        </a> 
                    </td> 
                    <td>{id_turma}</td> 
                    <td>{nome}</td> 
                    <td>{turma['curso.nome']}</td> 
                    <td className="level-right"> 
                        <a onClick={() => { this.handleShowInativar(id_turma, nome, id_curso) }} 
                        className="button is-small is-danger"> 
                        <i className="fa fa-trash"></i> 
                        </a> 
                    </td> 
                </tr>
            );
        });
    }
    renderSelectCursos = () => {
        return this.state.list_cursos.map((curso, i) => {
            const { id_curso, nome } = curso;
            return (
                <option value={id_curso}>{nome}</option>
            );
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        fetch(getUrlServer() + "turma", {
            method: (this.state.cadastrar ? 'POST' : 'PUT'),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            },
            body: JSON.stringify(
                {
                    nome: this.state.nome,
                    ativo: (this.state.excluir ? 'N' : 'S'),
                    id_curso: this.state.curso_id,
                    id_turma: this.state.id
                }
            )
        })
        .then(response => response.json())
        .then((data) => {
            if (typeof data.errors != 'undefined') {
                this.setState({
                    sucesso: '',
                    error: data.errors[0].msg
                });
                return;
            }
            this.setState({
                nome: '',
                error: '',
                sucesso: (this.state.cadastrar ? 'Turma cadastrada!' : this.state.editar ? 'Turma editada!' : 'Turma inativada!')
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
                            className="button is-primary is-large">Cadastrar</a>
                        </div>
                        <div className="column is-12">
                            <div className="card events-card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Turmas
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
                                            {
                                                this.state.list_turmas.length > 0 ?
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
                            <form id="form-turma" onSubmit={this.onSubmit}>
                            {
                                (this.state.cadastrar || this.state.editar) ?
                                (
                                    <div style={{textAlign: 'initial'}}>
                                        <div className="field">
                                            <label className="label">Nome</label>
                                            <div className="control">
                                                <input name="nome" onChange={this.onChange} value={this.state.nome} className="input" type="text" placeholder="Informe o nome da turma" />
                                            </div>
                                        </div>
                                        <div className="control">
                                            <label className="label">Curso</label>
                                            <div className="select">
                                                <select name="curso_id" onChange={this.onChange} value={this.state.curso_id}>
                                                    <option value="">Selecione</option>
                                                    {
                                                        this.state.list_cursos.length > 0 ?
                                                            this.renderSelectCursos() :
                                                            (<option value="" disabled>Nada encontrado!</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (this.state.excluir) ?
                                (<p>Deseja inativar a turma <strong>{this.state.nome}</strong>?</p>) : ''
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
                                <button class="button is-success" onClick={this.onSubmit}>
                                    {
                                        (this.state.cadastrar || this.state.editar) ?
                                        'Salvar' : 'Sim'
                                    }
                                </button>
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