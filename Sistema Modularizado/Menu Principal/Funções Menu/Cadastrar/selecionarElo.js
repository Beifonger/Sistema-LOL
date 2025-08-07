const rlSE = require("../../../Funções de utilidade/rl");
module.exports = function selecionarElo(callback) {
  const elos = ["FERRO", "BRONZE", "PRATA", "GOLD", "PLATINA", "DIAMANTE", "MESTRE", "GRÃO MESTRE", "CHALLENGER"];
  rlSE.question("Elo (1-9): ", e => {
    const elo = elos[parseInt(e, 10) - 1];
    rlSE.question("Divisão (1-4): ", d => { const divs = ["I", "II", "III", "IV"]; callback(elo, divs[d - 1]); });
  });
};