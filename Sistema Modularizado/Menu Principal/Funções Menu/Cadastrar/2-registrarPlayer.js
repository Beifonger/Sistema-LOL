const cadastrarPlayers = require("./3-cadastrarPlayer.js")
const rl = require("../../../Funções de utilidade/rl.js")

function registrarPlayers(time) {
    rl.question("Quantidade de players (5 a 10): ", (q) => {
      const qtd = parseInt(q);
      if (isNaN(qtd) || qtd < 5 || qtd > 10) {
        console.log("❌ Quantidade inválida.");
        return registrarPlayers(time);
      }
      cadastrarPlayers(time, qtd, 1);
    });
  }

  module.exports = registrarPlayers;