import React from 'react';
import './Login.css';
import 'bulma/css/bulma.css'


const Wrapper = () => (
    <div>
        <Header/>
        <Auth/>
    </div>
);

const Header = () => (
    <section className="hero is-danger is-bold">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                    Sign In Component
                </h1>
                <h2 className="subtitle">
                    With React + Bulma + Font Awesome
                </h2>
            </div>
        </div>
    </section>
);

class Auth extends React.Component {

    state = {
        authenticated: false
    }

    loginWithEmailAndPassword = () => {
        this.setState({authenticated: true})
    }

    loginWithProvider = () => {
        this.setState({authenticated: true})
    }

    handleClose = () => {
        this.setState({authenticated: false})
    }

    render() {
        return (
            <section className="section">

                <LoginForm handleSubmit={this.loginWithEmailAndPassword}/>

                <SignInSuccess active={this.state.authenticated} handleClose={this.handleClose}/>

            </section>
        )
    }
}

const LoginButton = ({icon, name, onClick}) => (
    <div className="field">
        <p className="control button is-medium" style={{width: '300px'}} onClick={onClick}>
      <span className="icon">
        <i className={`fa fa-${icon}`} aria-hidden="true"></i>
      </span>
            <span>{`Sign In With ${name}`}</span>
        </p>
    </div>
);

class LoginForm extends React.Component {

    state = {
        email: null,
        password: null
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
                            <label className="label" htmlFor="password">Senha</label>
                            <div className="control">
                                <input className="input" name="password" type="password" placeholder="senha" required
                                       onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control buttons is-centered">
                                <input className="button is-medium is-fullwidth green" type="submit" value="Entrar"/>
                            </div>
                        </div>
                    </form>
                    <p>Esqueceu sua senha?</p>
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

const SignInSuccess = ({active, handleClose}) => (
    <div className={`modal ${active && 'is-active'}`}>
        <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-content">
            <div className="notification is-success has-text-centered">
                <button className="delete" onClick={handleClose}></button>
                <p>
          <span className="icon is-large">
            <i className="fa fa-check-square fa-2x"></i>
          </span>
                    <span className="title"> Sign In Succesful!</span>
                </p>

            </div>
        </div>
    </div>
);

export {Auth, LoginForm} ;
