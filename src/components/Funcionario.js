import React from 'react';
import 'bulma/css/bulma.css';
import Page from './Page';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';

export default class Funcionario extends React.Component {
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
        id_tipo_usuario: '',
        list_tipo_usuario: [],
        list_funcionarios: []
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
            id_tipo_usuario: ''
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
            id_tipo_usuario: ''
        });
    }
    handleShowEditar = (id, nome, email, id_tipo_usuario) => {
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
            id_tipo_usuario: id_tipo_usuario
        });
    }
    handleShowInativar = (id, nome, email, id_tipo_usuario) => {
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
            id_tipo_usuario: id_tipo_usuario
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        fetch(getUrlServer() + "funcionario", {
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
                    id_tipo_usuario: this.state.id_tipo_usuario,
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
                sucesso: (this.state.cadastrar ? 'Funcionário cadastrado!' : this.state.editar ? 'Funcionário editado!' : 'Funcionário inativado!')
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
        this.getFuncionarios();
        this.getCargos();
    }

    getFuncionarios = () => {
        fetch(getUrlServer() + "funcionario", {
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
            copyState.list_funcionarios = data;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }

    getCargos = () => {
        fetch(getUrlServer() + "funcionario/cargos/", {
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
            copyState.list_tipo_usuario = data;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }

    renderTable = () => {
        return this.state.list_funcionarios.map((funcionario, i) => {
            const { id_usuario, nome, email, id_tipo_usuario } = funcionario;
            const nomeTipoUsuario = funcionario['tipo_usuario.nome'];
            return (
                <tr id={id_usuario}>
                    <td width="5%"> 
                        <a onClick={() => { this.handleShowEditar(id_usuario, nome, email, id_tipo_usuario) }}> 
                            <i className="fa fa-edit"></i> 
                        </a> 
                    </td> 
                    <td>{id_usuario}</td> 
                    <td>{nome}</td> 
                    <td>{email}</td> 
                    <td>{nomeTipoUsuario}</td> 
                    <td className="level-right"> 
                        <a onClick={() => { this.handleShowInativar(id_usuario, nome, email, id_tipo_usuario) }} 
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
    renderCargoList = () => {
        return this.state.list_tipo_usuario.map((turma, i) => {
            const { id_tipo_usuario, nome } = turma;
            return (
                <option value={id_tipo_usuario}>{nome}</option>
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
                                            Funcionários
                                        </h1>
                                        <h2 className="subtitle">
                                            Nessa seção, você poderá consultar, cadastrar, editar e inativar os funcionários.
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
                                        Funcionários
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
                                                <td>Cargo</td> 
                                                <th></th>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.list_funcionarios.length > 0 ?
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
                                                <input value={this.state.nome} name="nome" onChange={this.onChange} className="input" type="text" placeholder="Informe o nome do funcionário"></input>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">E-mail</label>
                                            <div className="control">
                                                <input value={this.state.email} name="email" onChange={this.onChange} className="input" type="email" placeholder="Informe o e-mail do funcionário"></input>
                                            </div>
                                        </div>
                                        <div className="control">
                                            <label className="label">Cargo</label>
                                            <div className="select">
                                                <select name="id_tipo_usuario" value={this.state.id_tipo_usuario} onChange={this.onChange}>
                                                    <option value="">Selecione</option>
                                                    {
                                                        this.state.list_tipo_usuario.length > 0 ?
                                                            this.renderCargoList() :
                                                            (<option value="" disabled>Nada encontrado!</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (this.state.excluir) ?
                                    (<p>Deseja inativar o funcionário <strong>{this.state.nome}</strong>?</p>) : ''
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