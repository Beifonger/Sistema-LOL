const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const gerarAlfabeto = require("./Funções de utilidade/gerarAlfabeto.js");
const carregarTimesTeste = require("./Funções de utilidade/carregarTimesTeste.js");
const { time } = require("console");

const times = JSON.stringify(carregarTimesTeste(true), null, 2)
console.log(times)
const tickets = [];
let chaveamentos = [];
const alfabeto = gerarAlfabeto();
console.log(alfabeto)

