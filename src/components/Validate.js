import React from 'react';
import './Validate.css';
import 'bulma/css/bulma.css'

export default class Validate extends React.Component {
    render() {
        return (
            <div className="Validate ">
                <div className="tile is-vertical">
                    <div className="tile">
                        <div className="tile is-parent">
                            <article className="tile is-child box">
                                <p className="title">Processos de validação</p>
                                <button className="button is-medium">Ver processos <br></br>em andamento</button>

                                <button className="button is-medium">Iniciar processo <br></br>de validação</button>

                            </article>
                        </div>
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child box">
                                <p className="title">Horas validadas:</p>
                                <p className="subtitle">Mostrar número</p>
                            </article>
                            <article className="tile is-child box">
                                <p className="title">Horas a validar:</p>
                                <p className="subtitle">Mostrar número</p>
                            </article>
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child box">
                        <p className="title">Documentação</p>
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
        );
    }
}
