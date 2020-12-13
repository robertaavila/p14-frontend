module.exports = {
    generateSecret: (param = 0) => {
        let dataHoraAtual = new Date();
        return parseInt((param + 
            (
                parseInt(dataHoraAtual.getDate()) +
                parseInt(dataHoraAtual.getSeconds()) + 
                (parseInt(dataHoraAtual.getMonth()) + 1) + 
                parseInt(dataHoraAtual.getFullYear()) + 
                parseInt(dataHoraAtual.getHours()) + 
                parseInt(dataHoraAtual.getMinutes()) + 
                parseInt(dataHoraAtual.getSeconds())
            ) + '' + dataHoraAtual.getSeconds()) + '', 10
        ).toString(28).toUpperCase();
    }
};