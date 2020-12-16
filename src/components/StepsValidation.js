import React from 'react';
import 'bulma/css/bulma.css';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import {getUrlServer} from '../util/env';
import {getToken, getUsuId, getUsuPermissoes} from '../util/login';
import { formatDate } from '../util/date';
import {generateSecret} from '../util/hash';

export default class StepsValidation extends React.Component {
    state = {
        id_solicitacao_validacao: this.props.id_solicitacao_validacao ? this.props.id_solicitacao_validacao : 0,
        id_status_atual: this.props.id_status_atual ? this.props.id_status_atual : 0,
        list_log_status: [],
        list_status_disponiveis: [],
        id_etapa_atual: 0,
        key: this.props.key || 0,
        funcionario: this.props.funcionario || false,
        solicitacao: this.props.solicitacao || false,
        list_etapas_por_nome: [],
        observacoes: '',
        idSolicitacao: '',
        idNovoStatus: '',
        selectedFile: '',
        certificado_digital: 'Selecione um arquivo',
        validator: {
            observacoes: ''
        },
        processoConcluido: this.solicitacao && this.solicitacao['status_solicitacao.status_solicitacao'] == 'Processo concluído',
        informarObservacoes: false,
        arquivo: {
            sucesso: false,
            response: '',
            enviando: false
        }
    };

    componentWillMount = () => {
        console.log(this.state.solicitacao);
        this.getLog();
        this.getStatus();
    }

    onFileChange = (e) => { 
        if (typeof e.target.files[0] == 'undefined') {
            this.setState({ selectedFile: '', certificado_digital: 'Selecione um arquivo' });     
            return;
        }
        this.setState({ selectedFile: e.target.files[0], certificado_digital: e.target.files[0].name }); 
    }

    enviaArquivo = () => {
        let copyState = this.state;
        copyState.arquivo.enviando = true;
        this.setState(copyState);
        const formData = new FormData(); 
        let novoNomeArquivo = getUsuId() + "_" + generateSecret() + "_" + this.state.certificado_digital;
        formData.append("arquivo", this.state.selectedFile, novoNomeArquivo); 
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
                copyState.arquivo.success = false;
                copyState.arquivo.enviando = false;
                copyState.arquivo.response = "Ocorreu um erro ao tentar enviar o arquivo! Tente novamente mais tarde!";
            }
            else if(data_document.status > 200) {
                copyState.arquivo.success = false;
                copyState.arquivo.enviando = false;
                copyState.arquivo.response = data_document.message;
            }
            else {
                copyState.arquivo.success = true;
                copyState.arquivo.response = "Documento anexado!";
                setTimeout(() => {
                    copyState.arquivo.success = false;
                    copyState.arquivo.response = "";
                    copyState.solicitacao.certificado_digital = novoNomeArquivo;
                    this.setState(copyState);        
                }, 1200);

                fetch(getUrlServer() + "solicitacao/", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(
                        {
                            observacoes: this.state.observacoes,
                            id_usuario: this.state.solicitacao.id_usuario, 
                            id_status_solicitacao: this.state.solicitacao.id_status_solicitacao,
                            id_solicitacao_validacao: this.state.solicitacao.id_solicitacao_validacao,
                            certificado_digital: novoNomeArquivo,
                            emissor_certificado: 'SENAI'
                        }
                    )
                })
                .then(response => response.json())
                .then((data) => {
                    if (typeof data.errors != 'undefined') {
                        copyState.arquivo.success = false;
                        copyState.arquivo.response = data.errors[0].msg;
                        alert(data.errors[0].msg)
                        return;
                    }
                    if (typeof data.error != 'undefined') {
                        copyState.arquivo.success = false;
                        copyState.arquivo.response = data.error;
                        return;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
            this.setState(copyState);
   
        })
        .catch(function (error) {
            let copyState = this.state;
            copyState.success = false;
            copyState.formulario = false;
            copyState.arquivo.enviando = false;
            copyState.response = "Ocorreu um erro ao tentar solicitar validação! Tente novamente mais tarde!";
            this.setState(copyState);
        });
    }
    getLog = () => {
        fetch(getUrlServer() + "log-solicitacao-status/" + this.state.id_solicitacao_validacao, {
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
            let list_log_status = [];
            let etapaAtual = 0;
            for(let i = 0; i < data.length; i++) {
                let row = data[i];
                list_log_status["id_" + row["id_status_solicitacao"].toString()] = row;
                if (row['id_status_solicitacao'] == this.state.id_status_atual) {
                    etapaAtual = (i) + 1;
                }
            }
            copyState.list_log_status = list_log_status;
            copyState.id_etapa_atual = etapaAtual;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }
    getStatus = () => {
        fetch(getUrlServer() + "status-solicitacao/", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        })
        .then(response => response.json())
        .then((data) => {
            let list_etapas_por_nome = [];
            for(let i =0; i < data.length; i++) {
                let row = data[i];
                list_etapas_por_nome[row['status_solicitacao']] = row['id_status_solicitacao'];
            }
            let copyState = this.state;
            copyState.list_status_disponiveis = data;
            copyState.list_etapas_por_nome = list_etapas_por_nome;
            this.setState(copyState);
        })
        .catch(function(error) {
            console.log('Ocorreu um erro ao realizar a requisição: ' + error.message);
        });
    }
    downloadFile = (fileName) => {
        fetch(getUrlServer() + "download/" + fileName, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            }
        })
        .then(response => response.blob())
        .then((data) => {
            var file = window.URL.createObjectURL(data);
            window.open(file);
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    onChange = (e) => {
        let validator = this.state.validator;
        validator[e.target.name] = "";
        this.setState({
            [e.target.name]: e.target.value,
            validator: validator
        });
    }
    updateStatus = (idNovoStatus, idSolicitacao, informarObservacoes = false, concluirProcesso = false) => {
        console.log(this.state.list_etapas_por_nome);
        if (informarObservacoes) {
            let stateCopy = this.state;
            stateCopy.informarObservacoes = true;
            stateCopy.observacoes = '';
            stateCopy.idNovoStatus = idNovoStatus;
            stateCopy.idSolicitacao = idSolicitacao;
            this.setState(stateCopy);
            return;
        }
        fetch(getUrlServer() + "solicitacao/", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': getToken()
            },
            body: JSON.stringify(
                {
                    observacoes: this.state.observacoes,
                    id_usuario: getUsuId(), 
                    id_status_solicitacao: idNovoStatus,
                    id_solicitacao_validacao: idSolicitacao
                }
            )
        })
        .then(response => response.json())
        .then((data) => {
            if (typeof data.errors != 'undefined') {
                alert(data.errors[0].msg)
                return;
            }
            if (typeof data.error != 'undefined') {
                alert(data.error)
                return;
            }
            
            if (concluirProcesso) {
                this.updateStatus(this.state.list_etapas_por_nome['Processo concluído'], idSolicitacao, false);
            } else {
                window.location.reload();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    renderTimeline = () => {
        let list_status_disponiveis = this.state.list_status_disponiveis;
        let list_log_status = this.state.list_log_status;
        let list_timeline = [];

        for(let i=0; i < list_status_disponiveis.length; i++) {
            let row = list_status_disponiveis[i];
            let obj = list_log_status["id_" + row['id_status_solicitacao'].toString()] || row;
            if (row['id_status_solicitacao'] == this.state.id_status_atual) {
                obj.linha_do_tempo = "ATUAL";
                list_timeline.push(obj);
                continue;
            }
            if (row['id_status_solicitacao'] > this.state.id_status_atual) {
                obj.linha_do_tempo = "FUTURO";
                list_timeline.push(obj);
                continue;
            }
            if (typeof obj != 'undefined') {
                obj.linha_do_tempo = "PASSADO";
                list_timeline.push(obj);
            }
        }
        let etapas = [];
        let aprovou = false;
        let reprovou = false;
        return list_timeline.map((log, i) => {
            const { data_hora_atualizacao, descricao, linha_do_tempo } = log;
            const nomeStatus = log["status_solicitacao.status_solicitacao"] || log["status_solicitacao"];
            const usuarioNome = log["usuario.nome"];
            let dataHoraAtualizacaoFormatada = data_hora_atualizacao != '' && data_hora_atualizacao != null ? formatDate(new Date(data_hora_atualizacao)) : '';
            let retorno = (<p></p>);
            
            if (nomeStatus == 'Processo reprovado' && usuarioNome != '' && usuarioNome != null) {
                reprovou = true;
            }
            else if(nomeStatus == 'Processo aprovado' && usuarioNome != '' && usuarioNome != null) {
                aprovou = true;
            }
            let getIcon = (indice_total, indice_atual) => {
                if (indice_atual == 0) {
                    return 'fas fa-paper-plane';
                }
                if (indice_atual == (indice_total-1)) {
                    return 'fas fa-flag-checkered';
                }
                return 'fas fa-search';
            };
            if (linha_do_tempo == 'ATUAL') {
                let color = reprovou ? 'red' : 'green';
                etapas.push(nomeStatus);
                retorno = (
                    <TimelineEvent 
                        title={<p><b>Etapa {etapas.length}</b>: {nomeStatus}</p>}
                        createdAt={dataHoraAtualizacaoFormatada}    
                        style={{color: color}}
                        iconStyle={{color: color}}
                        bubbleStyle={{border: "2px solid " + color}}  
                        icon={<span class="icon is-small"><i class={getIcon(list_timeline.length, i)}></i></span>}
                    >
                       {
                            descricao != '' && descricao != null ? (<span><b>{usuarioNome}</b> informou:<br/>{descricao}</span>)
                            : ''
                        }
                    </TimelineEvent>
                );
            }
            else if (linha_do_tempo == 'FUTURO' && nomeStatus != 'Processo reprovado' && nomeStatus != 'Processo aprovado') {
                etapas.push(nomeStatus);
                retorno = (
                    <TimelineEvent
                        title={<p><b>Etapa {etapas.length}</b>: {nomeStatus}</p>}
                        style={{color: "#cecece"}}
                        createdAt=""
                        iconStyle={{color: "#cecece"}}
                        bubbleStyle={{border: "2px solid #cecece"}}
                        icon={<span class="icon is-small"><i class={getIcon(list_timeline.length, i)}></i></span>}
                    >
                    </TimelineEvent>
                );
            }
            else if (linha_do_tempo == 'PASSADO' && (!aprovou && nomeStatus != 'Processo aprovado' || !reprovou && nomeStatus != 'Processo reprovado')){
                etapas.push(nomeStatus);
                retorno = (
                    <TimelineEvent
                        title={<p><b>Etapa {etapas.length}</b>: {nomeStatus}</p>}
                        style={{color: "#8f8fd0"}}
                        createdAt={dataHoraAtualizacaoFormatada}
                        iconStyle={{color: "#8f8fd0"}}
                        bubbleStyle={{border: "2px solid #8f8fd0"}}
                        icon={<span class="icon is-small"><i class={getIcon(list_timeline.length, i)}></i></span>}
                    >
                        {
                            descricao != '' && descricao != null  ? (<span><b>{usuarioNome}</b> informou:<br/>{descricao}</span>)
                            : ''
                        }
                        
                    </TimelineEvent>
                );
            }
            return retorno;
        });
    }

    proximoProcesso = () => {
        if (typeof this.state.solicitacao == 'undefined' || !this.state.solicitacao) return '';
        switch (this.state.solicitacao["status_solicitacao.status_solicitacao"]) {
            case 'Solicitação enviada':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoAssistente") > -1 ?
                            (
                                <span>
                                    <button className="button is-warning" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Em análise do assistente acadêmico'], this.state.solicitacao.id_solicitacao_validacao) }}>
                                        Iniciar análise
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            case 'Em análise do assistente acadêmico':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoAssistente") > -1 ?
                            (
                                <span>
                                    <button style={{ marginRight: '20px' }} className="button is-success" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Aprovado pelo assistente acadêmico'], this.state.solicitacao.id_solicitacao_validacao, true) }}>
                                        Aprovar
                                    </button>
                                    <button className="button is-danger" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Processo reprovado'], this.state.solicitacao.id_solicitacao_validacao, true) }}>
                                        Reprovar
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            case 'Aprovado pelo assistente acadêmico':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoCoordenador") > -1 ?
                            (
                                <span>
                                    <button className="button is-warning" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Em análise da coordenação'], this.state.solicitacao.id_solicitacao_validacao) }}>
                                        Iniciar análise
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            case 'Em análise da coordenação':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoCoordenador") > -1 ?
                            (
                                <span>
                                    <button style={{ marginRight: '20px' }} className="button is-success" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Aprovado pela coordenação'], this.state.solicitacao.id_solicitacao_validacao, true) }}>
                                        Aprovar
                                    </button>
                                    <button className="button is-danger" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Processo reprovado'], this.state.solicitacao.id_solicitacao_validacao, true) }}>
                                        Reprovar
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            case 'Aprovado pela coordenação':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoSecretaria") > -1 ?
                            (
                                <span>
                                    <button className="button is-warning" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Em análise da secretaria'], this.state.solicitacao.id_solicitacao_validacao) }}>
                                        Iniciar análise
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            case 'Em análise da secretaria':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoSecretaria") > -1 ?
                            (
                                <span>
                                    <button style={{ marginRight: '20px' }} className="button is-success" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Aprovado pela secretaria'], this.state.solicitacao.id_solicitacao_validacao, true) }}>
                                        Aprovar
                                    </button>
                                    <button className="button is-danger" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Processo reprovado'], this.state.solicitacao.id_solicitacao_validacao, true) }}>
                                        Reprovar
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            case 'Aprovado pela secretaria':
                return (
                    <div>
                        {
                            getUsuPermissoes().indexOf("aprovacaoCoordenador") > -1 ?
                            (
                                <span>
                                    <button className="button is-success" onClick={() => { this.updateStatus(this.state.list_etapas_por_nome['Processo aprovado'], this.state.solicitacao.id_solicitacao_validacao, false, true) }}>
                                        Concluir processo
                                    </button>
                                </span>
                            ) : ''
                        }
                    </div>
                );
            default:
                break;
        }
    };

    render() {
        return (
            <section id={this.state.key}>
                <div className="container has-text-centered box" style={{maxWidth: '800px'}}>
                    <h1 className="title mt-4">Acompanhar solicitação {this.state.id_solicitacao_validacao}</h1>
                    {
                        this.state.solicitacao ?
                            (
                                <span>
                                    <hr></hr>
                                    <h2><strong>Informações</strong></h2>
                                    <div style={{textAlign: 'initial', marginBottom: '20px', lineHeight: '35px'}}>
                                        {
                                            this.state.funcionario ?
                                            (
                                                <span>
                                                {
                                                    typeof this.state.solicitacao['usuario.nome'] != 'undefined' ?
                                                    (<p><b>Aluno</b>: {this.state.solicitacao['usuario.nome']}</p>) : ''
                                                }
                                                {
                                                    typeof this.state.solicitacao['usuario.turma.curso.nome'] != 'undefined' ?
                                                    (<p><b>Curso</b>: {this.state.solicitacao['usuario.turma.curso.nome']}</p>) : ''
                                                }
                                                {
                                                    typeof this.state.solicitacao['usuario.turma.nome'] != 'undefined' ?
                                                    (<p><b>Turma</b>: {this.state.solicitacao['usuario.turma.nome']}</p>) : ''
                                                }
                                                </span>
                                            ) : ''
                                        }
                                        {
                                            typeof this.state.solicitacao['tipo_atividade_complementar.nome'] != 'undefined' ?
                                            (<p><b>Tipo de Atividade</b>: {this.state.solicitacao['tipo_atividade_complementar.nome']}</p>) : ''
                                        }
                                        {
                                            typeof this.state.solicitacao.carga_horaria != 'undefined' ?
                                            (<p><b>Carga horária</b>: {this.state.solicitacao.carga_horaria}hrs</p>) : ''
                                            
                                        }
                                        <p>
                                            <b>Atividade do SENAI: </b>
                                            {
                                                typeof this.state.solicitacao.requerer_documento != 'undefined' && this.state.solicitacao.requerer_documento == 'S' ?
                                                (<span class="tag is-white is-success is-rounded is-inverted">
                                                    SIM
                                                </span>) :
                                                (<span class="tag is-white is-danger is-rounded is-inverted">
                                                    NÃO
                                                </span>)
                                            }
                                        </p>
                                        {
                                            this.state.funcionario &&
                                            typeof this.state.solicitacao.requerer_documento != 'undefined' && 
                                            this.state.solicitacao.requerer_documento == 'S' &&
                                            (typeof this.state.solicitacao.certificado_digital == 'undefined' || this.state.solicitacao.certificado_digital == null || this.state.solicitacao.certificado_digital == '')? 
                                            (<p>
                                                <label className="label">Adicionar documento: </label>
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
                                                    {
                                                        this.state.selectedFile != '' ?
                                                        (<p>
                                                            {
                                                                this.state.arquivo.enviando ?
                                                                (
                                                                    <button
                                                                        style={{marginLeft: 15, marginTop: 5}} class="button is-small is-success is-rounded is-disabled">
                                                                        <span class="icon">
                                                                            <i class="fas fa-check"></i>
                                                                        </span>
                                                                        <span>Salvar</span>
                                                                    </button>
                                                                ):
                                                                (
                                                                    <button onClick={this.enviaArquivo}
                                                                        style={{marginLeft: 15, marginTop: 5}} class="button is-small is-success is-rounded">
                                                                        <span class="icon">
                                                                            <i class="fas fa-check"></i>
                                                                        </span>
                                                                        <span>Salvar</span>
                                                                    </button>
                                                                )
                                                            }
                                                        </p>) : ''
                                                    }
                                                </div>
                                                {
                                                    this.state.arquivo.response != null &&
                                                    this.state.arquivo.response != '' ?
                                                    (
                                                        <span style={{fontSize: '14px'}}>
                                                            {this.state.arquivo.success ? (
                                                                <p style={{color: 'green'}}>
                                                                {
                                                                    this.state.arquivo.response
                                                                }
                                                                </p>
                                                            ) : (
                                                                <p style={{color: 'red'}}>
                                                                {
                                                                    this.state.arquivo.response
                                                                }
                                                                </p>
                                                            )}
                                                        </span>
                                                    ) : ''
                                                }
                                            </p>) : ''
                                        }
                                        {
                                            typeof this.state.solicitacao.emissor_certificado != 'undefined' && this.state.solicitacao.emissor_certificado != null ?
                                            (<p><b>Emissor do certificado</b>: {this.state.solicitacao.emissor_certificado}</p>) : ''
                                        }
                                        {
                                            typeof this.state.solicitacao.certificado_digital != 'undefined' && this.state.solicitacao.certificado_digital != null ?
                                            (<p><b>Certificado digital</b>:<button className="button is-success is-rounded is-inverted" onClick={() => this.downloadFile(this.state.solicitacao.certificado_digital)}><span className="icon is-small"><i className="fas fa-cloud-download-alt"></i></span></button></p>) : ''
                                        }
                                    </div>
                                </span>
                            ) : ''
                    }
                    <hr></hr>
                    <h2><strong>Timeline</strong></h2>
                    <Timeline style={{fontSize: '16px'}}>
                            {
                                this.state.list_status_disponiveis.length > 0 ?
                                this.renderTimeline() : (<h3 style={{textAlign: "center", marginTop: "40px"}}>Carregando...</h3>)
                            }
                    </Timeline>
                    <div className={`modal ${this.state.informarObservacoes && 'is-active'}`}>
                        <div className="modal-background" onClick={() => this.setState({informarObservacoes: false})}></div>
                        <div className="modal-content">
                            <div className={`notification is-light`}>
                                <button className="delete" onClick={() => this.setState({informarObservacoes: false})}></button>
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
                                        <button style={{ marginTop: '20px' }} className="button is-success" onClick={() => { 
                                            if (this.state.observacoes == ''){
                                                let copyState = this.state;
                                                copyState.validator.observacoes = 'Informe uma descrição do motivo da alteração do processo!';
                                                this.setState(copyState);
                                                return;
                                            }
                                            if (this.state.observacoes.length > 300){
                                                let copyState = this.state;
                                                copyState.validator.observacoes = 'No máximo 300 caracteres!';
                                                this.setState(copyState);
                                                return;
                                            }
                                            this.updateStatus(this.state.idNovoStatus, this.state.idSolicitacao) 
                                        }}>
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.funcionario ?
                    (<footer>
                        {
                            this.proximoProcesso()
                        }
                    </footer>) : ''
                }
            </section>
        );
    }
}
