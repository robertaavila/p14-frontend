const TOKEN_KEY = "token";
const USU_NAME_KEY = "nomeUsuario";
const USU_EMAIL_KEY = "emailUsuario";

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const login = (token, nomeUsuario, emailUsuario) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USU_NAME_KEY, nomeUsuario);
    window.localStorage.setItem(USU_EMAIL_KEY, emailUsuario);
    window.location = '/';
};

export const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USU_NAME_KEY);
    window.localStorage.removeItem(USU_EMAIL_KEY);
    window.location = '/acesso';
};

export const getUsuName = () => {
    return window.localStorage.getItem(USU_NAME_KEY);
};

export const getUsuEmail = () => {
    return window.localStorage.getItem(USU_EMAIL_KEY);
};

export const isAuthenticated = () => {
    const token = getToken();
    return (token !== null) && (typeof token !== 'undefined');    
};

export const isAdmin = () => true;