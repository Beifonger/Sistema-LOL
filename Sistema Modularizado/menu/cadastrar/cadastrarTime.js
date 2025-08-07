const rl = require("../../utils/rl");
const { times } = require("../../dataStore");
const solicitarTag = require("./solicitarTag");

module.exports = function cadastrarTime() {
  console.log("\n==== Cadastrar time ====");
  rl.question("Nome do time: ", nome => {
    if (!nome) return cadastrarTime();
    solicitarTag(nome);
  });
};
