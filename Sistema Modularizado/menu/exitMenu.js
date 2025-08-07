const rlExit = require("../utils/rl");
module.exports = function menuSaida() {
  rlExit.question("1-Voltar 2-Sair: ", o => {
    if (o === '1') return require("./index")();
    rlExit.close();
  });
};
