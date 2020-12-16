const TOKEN_KEY = "token";
const USU_NAME_KEY = "nomeUsuario";
const USU_EMAIL_KEY = "emailUsuario";
const USU_TIPO_KEY = "tipoUsuario";
const USU_ID_KEY = "idUsuario";
const USU_IDTURMA_KEY = "idTurma";
const USU_NOMETURMA_KEY = "nomeTurma";
const USU_IDCURSO_KEY = "idCurso";

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const login = (token, nomeUsuario, emailUsuario, tipoUsuario, idUsuario, idTurma, nomeTurma, idCurso) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USU_NAME_KEY, nomeUsuario);
    window.localStorage.setItem(USU_EMAIL_KEY, emailUsuario);
    window.localStorage.setItem(USU_TIPO_KEY, tipoUsuario);
    window.localStorage.setItem(USU_ID_KEY, idUsuario);
    window.localStorage.setItem(USU_IDTURMA_KEY, idTurma);
    window.localStorage.setItem(USU_NOMETURMA_KEY, nomeTurma);
    window.localStorage.setItem(USU_IDCURSO_KEY, idCurso);
    window.location = '/';
};

export const logout = (redirect = true) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USU_NAME_KEY);
    window.localStorage.removeItem(USU_EMAIL_KEY);
    if (redirect) window.location = '/acesso';
};

export const getUsuName = () => {
    return window.localStorage.getItem(USU_NAME_KEY);
};

export const getUsuEmail = () => {
    return window.localStorage.getItem(USU_EMAIL_KEY);
};

export const getUsuTipo = () => {
    return window.localStorage.getItem(USU_TIPO_KEY);
};

export const getUsuId = () => {
    return window.localStorage.getItem(USU_ID_KEY);
};

export const getUsuIdTurma = () => {
    return window.localStorage.getItem(USU_IDTURMA_KEY);
};

export const getUsuNomeTurma = () => {
    return window.localStorage.getItem(USU_NOMETURMA_KEY);
};

export const getUsuIdCurso = () => {
    return window.localStorage.getItem(USU_IDCURSO_KEY);
};

export const getUsuPermissoes = () => {
    let permissoes = [];
    console.log(window.localStorage.getItem(USU_TIPO_KEY));
    switch (window.localStorage.getItem(USU_TIPO_KEY)) {
        case "Aluno":
            permissoes.push("visualizarSomenteMeusProcessos");
            permissoes.push("solicitarProcesso");
            permissoes.push("dashboardAluno");
            break;
        case "Coordenador":
            permissoes.push("aprovacaoCoordenador");
            permissoes.push("crudFuncionario");
            permissoes.push("crudAluno");
            permissoes.push("crudTurma");
            permissoes.push("crudCursos");
            permissoes.push("relatorios");
            permissoes.push("visualizarProcessos");
            permissoes.push("aprovarProcesso");
            permissoes.push("dashboardFuncionario");
            break;
        case "Administrador":
            permissoes.push("visualizarSomenteMeusProcessos");
            permissoes.push("solicitarProcesso");
            permissoes.push("aprovacaoCoordenador");
            permissoes.push("aprovacaoSecretaria");
            permissoes.push("aprovacaoAssistente");
            permissoes.push("crudFuncionario");
            permissoes.push("crudAluno");
            permissoes.push("crudTurma");
            permissoes.push("crudCursos");
            permissoes.push("relatorios");
            permissoes.push("visualizarProcessos");
            permissoes.push("aprovarProcesso");
            permissoes.push("dashboardFuncionario");
            break;
        case "Secretaria":
            permissoes.push("aprovacaoSecretaria");
            permissoes.push("crudFuncionario");
            permissoes.push("crudAluno");
            permissoes.push("crudTurma");
            permissoes.push("crudCursos");
            permissoes.push("relatorios");
            permissoes.push("visualizarProcessos");
            permissoes.push("aprovarProcesso");
            permissoes.push("dashboardFuncionario");
            break;
        case "Assistente":
            permissoes.push("aprovacaoAssistente");
            permissoes.push("crudFuncionario");
            permissoes.push("crudAluno");
            permissoes.push("crudTurma");
            permissoes.push("crudCursos");
            permissoes.push("relatorios");
            permissoes.push("visualizarProcessos");
            permissoes.push("aprovarProcesso");
            permissoes.push("dashboardFuncionario");
            break;
    }
    return permissoes;
};

export const isAuthenticated = () => {
    const token = getToken();
    return (token !== null) && (typeof token !== 'undefined');    
};

export const isAdmin = () => true;