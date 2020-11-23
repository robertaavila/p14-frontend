import React from 'react';
import 'bulma/css/bulma.css'

export default class CreateClass extends React.Component {
    render() {
        return (
            <div className="columns is-centered pt-6">
                <div className="tile is-parent is-6">
                    <div className="column has-text-left box ml-2">
                        <p className="pb-3 has-text-weight-bold is-size-5">
                            Cadastrar turma
                        </p>
                        <div className="field">
                            <label className="label">Nome</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input"></input>
                            </div>
                        </div>
                        <div className="control">
                            <label className="label">Curso</label>
                            <div className="select">
                                <select>
                                    <option>Selecione</option>
                                    <option>Análise e desenvolvimento de sistemas</option>
                                    <option>Segurança da informação</option>
                                </select>
                            </div>
                        </div>
                        <div className="container">
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link">Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
