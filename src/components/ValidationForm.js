import React from 'react';
import './ValidationForm.css';
import 'bulma/css/bulma.css'
import Page from './Page';
import {getUrlServer} from '../util/env';
import {getToken} from '../util/login';
import {generateSecret} from '../util/hash';
import {getUsuName, getUsuId, getUsuIdTurma, getUsuNomeTurma, getUsuIdCurso} from '../util/login';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalidades: [],
            selectedModalidade: {},
            atividades: [],
            selectedAtividades: {},
            id_usuario: getUsuId(),
            id_curso: getUsuIdCurso(),
            id_turma: getUsuIdTurma(),
            requerer_documento: 'N',
            nome_curso: '',
            id_tipo_atividade_complementar: '',
            certificado_digital: 'Selecione um arquivo',
            confirmar_documento: '',
            emissor_certificado: '',
            carga_horaria: '',
            observacoes: '',
            id_modalidade: '',
            atividades_da_modalidade: [],
            list_tipo_atividade_por_id: [],
            validator: {
                id_modalidade: '',
                id_tipo_atividade_complementar: '',
                certificado_digital: '',
                confirmar_documento: '',
                emissor_certificado: '',
                carga_horaria: '',
                observacoes: ''
            },
            response: '',
            success: false,
            formulario: true,
            selectedFile: '',
            documentacao_exigida: '',
            maximo_total: 0,
            maximo_por_validacao: 0,
            observacao_sobre_carga_horaria: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        let erro = false;
        let state = this.state;
        state.success = false;
        state.response = "";
        state.validator.id_modalidade = '';
        state.validator.id_tipo_atividade_complementar = '';
        state.validator.certificado_digital = '';
        state.validator.confirmar_documento = '';
        state.validator.emissor_certificado = '';
        state.validator.carga_horaria = '';

        if (state.id_modalidade == '') {
            state.validator.id_modalidade = "Selecione uma modalidade!";
            erro = true;
        }
        if (state.id_tipo_atividade_complementar == '') {
            state.validator.id_tipo_atividade_complementar = "Selecione um tipo de atividade!";
            erro = true;
        }
        if (state.requerer_documento == "N") {
            if (state.certificado_digital == 'Selecione um arquivo') {
                state.validator.certificado_digital = "Selecione um certificado!";
                erro = true;
            }
            if (state.certificado_digital.length > 150) {
                state.validator.certificado_digital = "Nome do arquivo deve ter no máximo 150 caracteres!";
                erro = true;
            }
            if (state.confirmar_documento == '') {
                state.validator.confirmar_documento = "Aceite requerido!";
                erro = true;
            }
            if (state.emissor_certificado == '') {
                state.validator.emissor_certificado = "Informe o emissor do certificado!";
                erro = true;
            }
            if (state.emissor_certificado.length > 150) {
                state.validator.emissor_certificado = "Informe no máximo 150 caracteres!";
                erro = true;
            }
        }
        if (state.carga_horaria == '') {
            state.validator.carga_horaria = "Informe a carga horária!";
            erro = true;
        }
        if (state.observacoes == '') {
            state.validator.observacoes = "Informe uma breve descrição sobre sua solicitação!";
            erro = true;
        }
        if (state.observacoes.length > 300) {
            state.validator.observacoes = "Informe no máximo 300 caracteres!";
            erro = true;
        }
    
        if(!erro) {
            let novoProcesso = {
                id_usuario: state.id_usuario,
                observacoes: state.observacoes,
                id_status_solicitacao: 1,
                id_tipo_atividade_complementar: state.id_tipo_atividade_complementar,
                requerer_documento: state.requerer_documento,
                carga_horaria: state.carga_horaria
            };
            if (state.requerer_documento == "N") {
                novoProcesso.emissor_certificado = state.emissor_certificado;
                novoProcesso.certificado_digital = getUsuId() + "_" + generateSecret() + "_" + state.certificado_digital;
            }

            let copyState = this.state;
            if (state.selectedFile != '') {
                const formData = new FormData(); 
                formData.append("arquivo", this.state.selectedFile, novoProcesso.certificado_digital); 
                fetch(getUrlServer() + "solicitacao/documento", {
                    method: 'POST',
                    headers: {
                        'authorization': getToken(),
                    },
                    body: formData
                })
                .then(response => response.json())
                .then((data_document) => {
                    if (typeof data_document.status == 'undefined') {
                        copyState.formulario = true;
                        copyState.success = false;
                        copyState.response = "Ocorreu um erro ao tentar solicitar validação! Tente novamente mais tarde!";
                    }
                    else if(data_document.status > 200) {
                        copyState.formulario = true;
                        copyState.success = false;
                        copyState.response = data_document.message;
                    }
                    else {
                        fetch(getUrlServer() + "solicitacao", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'authorization': getToken(),
                            },
                            body: JSON.stringify(novoProcesso)
                        })
                        .then(response => response.json())
                        .then((data) => {
                            if (typeof data.errors != 'undefined') {
                                copyState.response = data.errors[0]["msg"];
                                copyState.success = false;
                            }
                            else if (typeof data.error != 'undefined' && data.error != '') {
                                copyState.response = data.error;
                                copyState.success = false;
                            }
                            
                            if (typeof data.solicitacao != 'undefined') {
                                if (state.requerer_documento == "N") {
                                    copyState.formulario = false;
                                    copyState.success = true;
                                    copyState.response = "Sua solicitação foi enviada! Iremos analisar o documento e as demais informações! Você será notificado por e-mail com o status da sua solicitação!";
                                }
                                else {
                                    copyState.formulario = false;
                                    copyState.success = true;
                                    copyState.response = "Sua solicitação foi enviada! Iremos verificar a atividade realizada pelo SENAI! Você será notificado por e-mail com o status da sua solicitação!";
                                }
                            }

                            this.setState(copyState);
                        })
                        .catch(function (error) {
                            let copyState = this.state;
                            copyState.success = false;
                            copyState.formulario = false;
                            copyState.response = "Ocorreu um erro ao tentar solicitar validação! Tente novamente mais tarde!";
                            this.setState(copyState);
                        });
                    }
                    
                    this.setState(copyState);
                })
                .catch(function (error) {
                    let copyState = this.state;
                    copyState.success = false;
                    copyState.formulario = false;
                    copyState.response = "Ocorreu um erro ao tentar solicitar validação! Tente novamente mais tarde!";
                    this.setState(copyState);
                });
            } else {
                fetch(getUrlServer() + "solicitacao", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': getToken(),
                    },
                    body: JSON.stringify(novoProcesso)
                })
                .then(response => response.json())
                .then((data) => {
                    if (typeof data.errors != 'undefined') {
                        copyState.response = data.errors[0]["msg"];
                        copyState.success = false;
                    }
                    else if (typeof data.error != 'undefined' && data.error != '') {
                        copyState.response = data.error;
                        copyState.success = false;
                    }
                    
                    if (typeof data.solicitacao != 'undefined') {
                        if (state.requerer_documento == "N") {
                            copyState.formulario = false;
                            copyState.success = true;
                            copyState.response = "Sua solicitação foi enviada! Iremos analisar o documento e as demais informações! Você será notificado por e-mail com o status da sua solicitação!";
                        }
                        else {
                            copyState.formulario = false;
                            copyState.success = true;
                            copyState.response = "Sua solicitação foi enviada! Iremos verificar a atividade realizada pelo SENAI! Você será notificado por e-mail com o status da sua solicitação!";
                        }
                    }

                    this.setState(copyState);
                })
                .catch(function (error) {
                    let copyState = this.state;
                    copyState.success = false;
                    copyState.formulario = false;
                    copyState.response = "Ocorreu um erro ao tentar solicitar validação! Tente novamente mais tarde!";
                    this.setState(copyState);
                });
            }
        }
        this.setState(state);
    }
    componentWillMount = () => {
        this.getCursos();
        this.fetchModalidadesFromBE();
        this.fetchAtividadesFromBE();
    }
    fetchModalidadesFromBE = () => {
        fetch(getUrlServer() + "atividade-complementar/modalidade", {
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
                copyState.modalidades = data;
                console.log(data);
                this.setState(copyState);
            })
            .catch(function (error) {
                console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
            });
    }

    onChange = (e) => {
        let validator = this.state.validator;
        validator[e.target.name] = "";
        this.setState({
            [e.target.name]: e.target.value,
            validator: validator
        });
        if (e.target.name == "id_modalidade") {
            let validator = this.state.validator;
            validator.carga_horaria = '';
            this.setState({
                atividades_da_modalidade: (typeof this.state.atividades[parseInt(e.target.value)] != 'undefined') ? this.state.atividades[parseInt(e.target.value)] : this.state.atividades_da_modalidade,
                documentacao_exigida: '',
                maximo_total: 0,
                maximo_por_validacao: 0,
                validator: validator,
                observacao_sobre_carga_horaria: ''
            });
        }
        if (e.target.name == "id_tipo_atividade_complementar") {
            let list_tipo_atividade_por_id = this.state.list_tipo_atividade_por_id;
            let obj = list_tipo_atividade_por_id["atv_" + e.target.value];
            
            if (typeof obj != 'undefined') {
                let validator = this.state.validator;
                validator.carga_horaria = '';
                this.setState({
                    documentacao_exigida: obj.documentacao_exigida,
                    observacao_sobre_carga_horaria: obj.observacao_sobre_carga_horaria,
                    maximo_total: obj.maximo_total,
                    maximo_por_validacao: obj.maximo_por_validacao,
                    validator: validator
                });
            }
        }
        if (e.target.name == 'carga_horaria') {
            let valorInformado = parseInt(e.target.value);
            let maximoDaAtividade = parseInt(this.state.maximo_por_validacao);
            if (typeof maximoDaAtividade != 'number' || maximoDaAtividade == 0) {
                maximoDaAtividade = parseInt(this.state.maximo_total);
            }

            if ((valorInformado > maximoDaAtividade) && maximoDaAtividade != 0) {
                let validator = this.state.validator;
                validator.carga_horaria = `A carga horária máxima da atividade selecionada é de ${maximoDaAtividade} horas! Ajustamos o valor de ${valorInformado} para ${maximoDaAtividade}.`;
                this.setState({
                    validator: validator,
                    carga_horaria: maximoDaAtividade
                });
            }
        }
    }

    onChangeCheckBox = (e) => {
        let validator = this.state.validator;
        if (typeof validator[e.target.name] != 'undefined') validator[e.target.name] = "";
        this.setState({
            [e.target.name]: e.target.checked ? 'S' : 'N',
            validator: validator
        });
    }

    onFileChange = (e) => { 
        if (typeof e.target.files[0] == 'undefined') {
            this.setState({ selectedFile: '', certificado_digital: 'Selecione um arquivo' });     
            return;
        }
        this.setState({ selectedFile: e.target.files[0], certificado_digital: e.target.files[0].name }); 
    }

    fetchAtividadesFromBE = () => {
        fetch(getUrlServer() + "atividade-complementar", {
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
            let atividades = [];
            let list_tipo_atividade_por_id = [];
            for(let i = 0; i < data.length; i++) {
                if (typeof atividades[data[i]["id_modalidade"]] == 'undefined') {
                    atividades[data[i]["id_modalidade"]] = [];
                }
                atividades[data[i]["id_modalidade"]].push(data[i]);
                list_tipo_atividade_por_id["atv_" + data[i]["id_tipo_atividade_complementar"]] = data[i];
            }
            copyState.atividades = atividades;
            copyState.atividades_da_modalidade = data;
            copyState.list_tipo_atividade_por_id = list_tipo_atividade_por_id;
            this.setState(copyState);
        })
        .catch(function (error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }
    getCursos = () => {
        fetch(getUrlServer() + "curso/" + getUsuIdCurso(), {
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
            copyState.nome_curso = data[0]['nome'];
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }
    render() {
        const { atividades, modalidades, observacao_sobre_carga_horaria, documentacao_exigida } = this.state;

        return (
            <div>
                {
                    (this.state.formulario) ?
                    (
                        <form onSubmit={this.handleSubmit}>
                            <div className="column">
                            <div className="column is-centered" style={{marginTop: '10px'}}>
                                <section className="hero is-info welcome is-small mb-3">
                                    <div className="hero-body">
                                        <div className="container">
                                            <h1 className="title">
                                                Solicitar validação
                                            </h1>
                                            <h2 className="subtitle">
                                            Preencha o formulário abaixo para iniciar a validação de atividade complementar
                                            </h2>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="columns" style={{marginBottom: '40px'}}>
                                <div className="column">
                                    <div className="has-text-left box mr-2">
                                        <div className="container">
                                            <div className="field">
                                                <label className="label">Nome</label>
                                                <div className="control">
                                                    <input 
                                                        className="input"
                                                        value={getUsuName()}
                                                        type="text" disabled />
                                                </div>
                                            </div>
                                            <div className="field">
                                                <label className="label">Curso</label>
                                                <div className="control">
                                                    <div className="select">
                                                        <select disabled>
                                                            {
                                                                this.state.nome_curso != '' ?
                                                                <option value={this.state.id_curso} disabled selected>
                                                                    {this.state.nome_curso}
                                                                </option> :
                                                                (<option value="" disabled selected>Nada encontrado!</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <label className="label">Turma</label>
                                                <div className="control">
                                                    <div className="select" disabled>
                                                        <select disabled>
                                                            <option value={getUsuIdTurma()} selected>{getUsuNomeTurma()}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <div className="control">
                                                        <label className="checkbox ml-1">
                                                            <input type="checkbox" name="requerer_documento" onChange={this.onChangeCheckBox}/>
                                                            &nbsp; Esta atividade complementar foi realizada pelo SENAI.
                                                        </label>
                                                        
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    <label className="label">Modalidade</label>
                                                    <div className="control">
                                                        <div className="select">
                                                            <select name="id_modalidade"
                                                                onChange={this.onChange}
                                                                value={this.state.id_modalidade}>
                                                                <option>Selecione</option>
                                                                {this.state.modalidades.map((v) => <option value={v.id_modalidade}>{v.nome}</option>)}
                                                            </select>
                                                        </div>
                                                        {
                                                            this.state.validator.id_modalidade != '' ?
                                                            (<p className="help is-danger">{this.state.validator.id_modalidade}</p>) : ''
                                                        }
                                                    </div>
                                                    <label className="label">Tipo de atividade</label>
                                                    <div className="control">
                                                        <div className="select">
                                                            <select name="id_tipo_atividade_complementar"
                                                                onChange={this.onChange}
                                                                value={this.state.id_tipo_atividade_complementar}>
                                                                <option>Selecione</option>
                                                                {this.state.atividades_da_modalidade.map((v) => 
                                                                    <option value={v.id_tipo_atividade_complementar}>
                                                                        {v.nome}
                                                                    </option>)}
                                                            </select>
                                                        </div>
                                                        {
                                                            this.state.validator.id_tipo_atividade_complementar != '' ?
                                                            (<p className="help is-danger">{this.state.validator.id_tipo_atividade_complementar}</p>) : ''
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    this.state.requerer_documento == "N" ?
                                                    (<div>
                                                        <div>
                                                            <label className="label">Certificado digital</label>
                                                            <div className="file has-name">
                                                                <label className="file-label">
                                                                    <input 
                                                                        className="file-input"
                                                                        type="file"
                                                                        onChange={this.onFileChange}
                                                                        name="resume"/>
                                                                    <span className="file-cta">
                                                                        <span className="file-icon">
                                                                            <i className="fas fa-upload"></i>
                                                                        </span>
                                                                    </span>
                                                                    <span className="file-name">
                                                                        {this.state.certificado_digital}
                                                                    </span>
                                                                </label>
                                                            </div>
                                                            {
                                                                this.state.validator.certificado_digital != '' ?
                                                                (<p className="help is-danger">{this.state.validator.certificado_digital}</p>) : ''
                                                            }
                                                            {
                                                                documentacao_exigida != '' ?
                                                                (<p className="help is-info">Documentação exigida: <b>{documentacao_exigida}</b></p>) : ''
                                                            }
                                                        </div>
                                                        <div className="field">
                                                            <div className="control mt-2">
                                                                <label className="checkbox">
                                                                    <input type="checkbox" name="confirmar_documento" onChange={this.onChangeCheckBox}/>
                                                                    &nbsp; Atesto que este documento é verídico e aceito as implicações
                                                                    legais cabíveis.
                                                                </label>
                                                                {
                                                                    this.state.validator.confirmar_documento != '' ?
                                                                    (<p className="help is-danger">{this.state.validator.confirmar_documento}</p>) : ''
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="field">
                                                    <label className="label">Emissor do certificado</label>
                                            
                                                        <input className="input"
                                                            type="text" 
                                                            placeholder="" 
                                                            value={this.state.emissor_certificado}
                                                            name="emissor_certificado" 
                                                            onChange={this.onChange} />
                                                        {
                                                            this.state.validator.emissor_certificado != '' ?
                                                            (<p className="help is-danger">{this.state.validator.emissor_certificado}</p>) : ''
                                                        }
                                                    </div>
                                                    </div>) : ''
                                                }
                                            <div className="field" style={{marginTop: '10px'}}>
                                                <label className="label">Carga horária</label>
                                                <input className="input"
                                                    type="number" 
                                                    name="carga_horaria"
                                                    onChange={this.onChange}
                                                    value={this.state.carga_horaria}
                                                    placeholder="" />
                
                                                {
                                                    this.state.validator.carga_horaria != '' ?
                                                    (<p className="help is-danger">{this.state.validator.carga_horaria}</p>) : ''
                                                }
                                                {
                                                    observacao_sobre_carga_horaria != '' && observacao_sobre_carga_horaria != null ?
                                                    (<p className="help is-info">Carga horária: <b>{observacao_sobre_carga_horaria}</b></p>) : ''
                                                }
                                            </div>
                                            <div className="container">
                                                <div className="field">
                                                    <label className="label">Observações</label>
                                        
                                                        <textarea className="textarea" 
                                                            placeholder=""
                                                            name="observacoes"
                                                            value={this.state.observacoes}
                                                            onChange={this.onChange}></textarea>
                                
                                                    {
                                                        this.state.validator.observacoes != '' ?
                                                        (<p className="help is-danger">{this.state.validator.observacoes}</p>) : ''
                                                    }
                                                </div>

                                                <div className="field is-grouped">
                                                    <div className="control">
                                                        <button className="button is-link" type="submit">Enviar</button>
                                                    </div>
                                                </div>
                                                {
                                                    (this.state.response != '' && this.state.success == false) ?
                                                        (
                                                            <div class="notification is-danger is-light" style={{marginTop: '40px'}}>
                                                                {this.state.response}
                                                            </div>
                                                        ) : ''
                                                }
                                                {
                                                    (this.state.response != '' && this.state.success == true) ?
                                                        (
                                                            <div class="notification is-success is-light" style={{marginTop: '40px'}}>
                                                                {this.state.response}
                                                            </div>
                                                        ) : ''
                                                }
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    ) : (
                    <div>
                        {
                            (this.state.response != '' && this.state.success == false) ?
                                (
                                    <div class="notification is-danger is-light" style={{marginTop: '40px'}}>
                                        {this.state.response}
                                    </div>
                                ) : ''
                        }
                        {
                            (this.state.response != '' && this.state.success == true) ?
                                (
                                    <div class="notification is-success is-light" style={{marginTop: '40px'}}>
                                        {this.state.response}
                                    </div>
                                ) : ''
                        }
                    </div>)
                }
                <div>
                
                </div>
            </div>
        );
    }
}
export default class ValidationForm extends React.Component {
    render() {
        return (
            <div>
                <Page body={<Form />}/>    
            </div>
        );
    }
}