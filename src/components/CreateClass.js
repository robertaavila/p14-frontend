import React from 'react';
import 'bulma/css/bulma.css'

export default class CreateClass extends React.Component {
    state = {
        nome: (this.props.nome ? this.props.nome : ''),
        curso_id: (this.props.curso_id ? this.props.curso_id : '0')
    }
    render() {
        return (
            <div style={{textAlign: 'initial'}}>
                <div className="field">
                    <label className="label">Nome</label>
                    <div className="control">
                        <input value={this.state.nome} className="input" type="text" placeholder="Informe o nome da turma" />
                    </div>
                </div>
                <div className="control">
                    <label className="label">Curso</label>
                    <div className="select">
                        <select>
                            <option value="">Selecione</option>
                            <option value="1" selected={this.state.curso_id == 1}>
                                Análise e desenvolvimento de sistemas
                            </option>
                            <option value="2" selected={this.state.curso_id == 2}>
                                Segurança da informação
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
