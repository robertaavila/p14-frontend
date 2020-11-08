import React from 'react';
import './Login.css';
import 'bulma';
import { getUrlServer } from '../util/env';
import { login, logout } from '../util/login';


class Auth extends React.Component {

    state = {
        modal: false,
        modalMessage: "Nossos servidores se encontram indisponíveis no momento, tente novamente mais tarde.",
        modalError: false,
        loading: false
    }

    loginWithEmailAndPassword = (state) => {
        const SERVER_URL = getUrlServer();
        this.setState({loading: true});
        fetch(SERVER_URL + 'acesso', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
        .then(resp => {
            if (resp.statusText === "Not Found" || resp.statusText === "Internal Error") {
                this.setState({
                    modal: true,
                    modalMessage: "Nossos servidores se encontram indisponíveis no momento, tente novamente mais tarde.",
                    modalError: true,
                    loading: false
                });
            }
            return resp.json();
        })
        .then(data => {
            if (typeof data.errors != 'undefined') {
                this.setState({
                    modal: true,
                    modalMessage: data.errors,
                    modalError: true,
                    loading: false
                });
                return false;
            }
            login(data.token, data.nomeUsuario, data.emailUsuario);
        })
        .catch(error => {
            if (error.statusText === "Not Found" || error.statusText === "Internal Error") {
                this.setState({
                    modal: true,
                    modalMessage: "Nossos servidores se encontram indisponíveis no momento, tente novamente mais tarde.",
                    modalError: true,
                    loading: false
                });
            }
            console.error(error);
        });
    }

    handleClose = () => {
        this.setState({modal: false})
    }

    render() {
        return (
            <section className="section">
                <LoginForm handleSubmit={this.loginWithEmailAndPassword} loading={this.state.loading} />

                <SignStatus modal={this.state.modal} handleClose={this.handleClose} modalMessage={this.state.modalMessage} modalError={this.state.modalError} />
            </section>
        )
    }
}

class LoginForm extends React.Component {

    state = {
        email: null,
        senha: null,
        loading: this.props.loading ? this.props.loading : false
    }

    handleChange = (event) => this.setState({[event.target.name]: event.target.value})

    handleSubmit = () => this.props.handleSubmit(this.state)

    render() {
        return (
            <section>
                <div className="container has-text-centered box" style={{maxWidth: '500px'}}>
                    <h1 className="title">Bem-vindo</h1>
                    <h2 className="subtitle">Validação de atividades complementares SESI SENAI </h2>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit();
                        }}>
                        <div className="field">
                            <label className="label" htmlFor="email">Email</label>
                            <div className="control">
                                <input className="input" name="email" type="email" placeholder="email" required
                                       onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="senha">Senha</label>
                            <div className="control">
                                <input className="input" name="senha" type="password" placeholder="senha" required
                                       onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control buttons is-centered">
                                <input className="button is-medium is-fullwidth green" type="submit" value="Entrar" style={{ outline: '0 !important' }}/>
                                {
                                    this.props.loading ?
                                    (<progress class="progress is-small is-primary" max="100" style={{marginTop: '-15px'}}></progress>) : ''
                                }
                            </div>
                        </div>
                    </form>
                    <div style={{ marginTop: '15px' }}>
                        <a>Esqueceu sua senha?</a>
                    </div>
                </div>
                <div className="container has-text-centered box" style={{maxWidth: '400px'}}>

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
                    <a
                        className="Login-link"
                        href="https://drive.google.com/file/d/1FkN2SYad77Zp_Vqmlh8qXp754cWJ6CG-/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2>SENAI - Regulamento de Atividades Complementares</h2>
                    </a>
                </div>

            </section>
        );
    }
}

const SignStatus = ({modal, handleClose, modalMessage = 'Teste', modalError}) => (
    <div className={`modal ${modal && 'is-active'}`}>
        <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-content">
            <div className={`notification ${modalError ? 'is-danger' : 'is-success'} is-light`}>
                <button className="delete" onClick={handleClose}></button>
                {modalMessage}
            </div>
        </div>
    </div>
);

export {Auth, LoginForm} ;
