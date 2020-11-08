module.exports = {
    getUrlServer: () => {
        let SERVER_URL = process.env.REACT_APP_SERVER_URL;
        return SERVER_URL + (SERVER_URL[SERVER_URL.length -1].indexOf("/") != -1 ? "" : "/");
    }
};