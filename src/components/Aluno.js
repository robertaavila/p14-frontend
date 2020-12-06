import React from 'react';
import 'bulma/css/bulma.css';
import Page from './Page';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';

export default class Aluno extends React.Component {
    state = {
        modal: false,
        cadastrar: false,
        editar: false,
        excluir: false,
        error: '',
        sucesso: '',
        id: 0,
        nome: '',
        email: '',
        matricula: '',
        id_turma: '',
        list_turmas: [],
        list_alunos: []
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
            email: '',
            matricula: '',
            id_turma: ''
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
            email: '',
            matricula: '',
            id_turma: ''
        });
    }
    handleShowEditar = (id, nome, email, matricula, id_turma) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: true,
            excluir: false,
            error: '',
            sucesso: '',
            id: id,
            nome: nome,
            email: email,
            matricula: matricula,
            id_turma: id_turma
        });
    }
    handleShowInativar = (id, nome, email, matricula, id_turma) => {
        this.setState({
            modal: true,
            cadastrar: false,
            editar: false,
            excluir: true,
            error: '',
            sucesso: '',
            id: id,
            nome: nome,
            email: email,
            matricula: matricula,
            id_turma: id_turma
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        fetch(getUrlServer() + "aluno", {
            method: (this.state.cadastrar ? 'POST' : 'PUT'),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            },
            body: JSON.stringify(
                {
                    nome: this.state.nome,
                    email: this.state.email,
                    matricula: this.state.matricula,
                    id_turma: this.state.id_turma,
                    senha: (this.state.cadastrar ? '000000' : ''),
                    ativo: (this.state.excluir ? 'N' : 'S'),
                    id: this.state.id
                }
            )
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
            if (typeof data.error != 'undefined') {
                this.setState({
                    error: data.error,
                    sucesso: ''
                });
                return;
            }
            this.setState({
                error: '',
                sucesso: (this.state.cadastrar ? 'Aluno cadastrado!' : this.state.editar ? 'Aluno editado!' : 'Aluno inativado!')
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
        this.getAlunos();
        this.getTurmas();
    }

    getAlunos = () => {
        fetch(getUrlServer() + "aluno", {
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
            copyState.list_alunos = data;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
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

    renderTable = () => {
        return this.state.list_alunos.map((aluno, i) => {
            const { id_usuario, nome, email, matricula, id_turma } = aluno;
            const turmaNome = aluno['turma.nome'];
            return (
                <tr id={id_usuario}>
                    <td width="5%"> 
                        <a onClick={() => { this.handleShowEditar(id_usuario, nome, email, matricula, id_turma) }}> 
                            <i className="fa fa-edit"></i> 
                        </a> 
                    </td> 
                    <td>{id_usuario}</td> 
                    <td>{nome}</td> 
                    <td>{email}</td> 
                    <td>{matricula}</td> 
                    <td>{turmaNome}</td> 
                    <td className="level-right"> 
                        <a onClick={() => { this.handleShowInativar(id_usuario, nome, email, matricula, id_turma) }} 
                        className="button is-small is-danger"> 
                        <i className="fa fa-trash"></i> 
                        </a> 
                    </td> 
                </tr>
            );
        });
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    renderTurmaList = () => {
        return this.state.list_turmas.map((turma, i) => {
            const { id_turma, nome } = turma;
            const cursoNome = turma['curso.nome'];
            return (
                <option value={id_turma}>{nome + " - " + cursoNome}</option>
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
                                            Alunos
                                        </h1>
                                        <h2 className="subtitle">
                                            Nessa seção, você poderá consultar, cadastrar, editar e inativar os alunos.
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
                                        Alunos
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
                                                <td>ID</td> 
                                                <td>Nome</td> 
                                                <td>Email</td> 
                                                <td>Matrícula</td> 
                                                <td>Turma</td> 
                                                <th></th>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.list_alunos.length > 0 ?
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
                            <form id="form-curso" onSubmit={this.onSubmit}>
                            {
                                (this.state.cadastrar || this.state.editar) ?
                                (
                                    <div style={{textAlign: 'initial'}}>
                                        <div className="field">
                                            <label className="label">Nome</label>
                                            <div className="control">
                                                <input value={this.state.nome} name="nome" onChange={this.onChange} className="input" type="text" placeholder="Informe o nome do aluno"></input>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">Matrícula</label>
                                            <div className="control">
                                                <input value={this.state.matricula} name="matricula" onChange={this.onChange} className="input" type="number" placeholder="Informe a matrícula do aluno"></input>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">E-mail</label>
                                            <div className="control">
                                                <input value={this.state.email} name="email" onChange={this.onChange} className="input" type="email" placeholder="Informe o e-mail do aluno"></input>
                                            </div>
                                        </div>
                                        <div className="control">
                                            <label className="label">Turma</label>
                                            <div className="select">
                                                <select name="id_turma" value={this.state.id_turma} onChange={this.onChange}>
                                                    <option value="">Selecione</option>
                                                    {
                                                        this.state.list_turmas.length > 0 ?
                                                            this.renderTurmaList() :
                                                            (<option value="" disabled>Nada encontrado!</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (this.state.excluir) ?
                                    (<p>Deseja inativar o aluno <strong>{this.state.nome}</strong>?</p>) : ''
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