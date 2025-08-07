const carregarTimesTeste = require("./utils/carregarTimesTeste");
const gerarAlfabeto = require("./utils/gerarAlfabeto");

const times = carregarTimesTeste(true);
const tickets = [];
let chaveamentos = [];
const alfabeto = gerarAlfabeto();

module.exports = { times, tickets, chaveamentos, alfabeto };
