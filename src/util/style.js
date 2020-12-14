module.exports = {
    getSeverityColorFromStatus: (status) => {
        if (status.indexOf('Em análise') > -1 || status.indexOf("Aprovado pel") > -1) {
            return "#3273dc";
        }
        if (status.indexOf('Processo aprovado') > -1 || status.indexOf('Processo concluído') > -1) {
            return "#48c774";
        }
        if (status.indexOf('Processo reprovado') > -1) {
            return "#f14668";
        }
        return '#ffdd57';
    },
    shortString: (text) => {
        if (typeof text != 'string') return text;
        return text.replace(/(.{25})..+/, "$1…");
    }
}