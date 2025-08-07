const rl = require("../../utils/rl");

module.exports = function selecionarElo(callback) {
  const elos = ["FERRO","BRONZE","PRATA","GOLD","PLATINA","DIAMANTE","MESTRE","GRÃO MESTRE","CHALLENGER"];
  rl.question("Elo (1-9): ", e => {
    const elo = elos[parseInt(e, 10) - 1];
    rl.question("Divisão (1-4): ", d => callback(elo, ["I","II","III","IV"][parseInt(d, 10) - 1]));
  });
};
