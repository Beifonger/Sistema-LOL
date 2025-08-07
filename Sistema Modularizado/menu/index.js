const rl = require("../utils/rl");
const cadastrarMenu = require("./cadastrar/cadastrarTime");
const editarMenu = require("./editar/editarTime");
const bidMenu = require("./bid/menuBID");
const chaveMenu = require("./chaveamento/menuChaveamento");
const resultadosMenu = require("./resultados/registrarResultados");
const regrasMenu = require("./regras/mostrarRegras");
const suporteMenu = require("./suporte/menuSuporte");

function menuPrincipal() {
  console.log(`
==== Menu Principal ====
1-Cadastrar 2-Editar 3-BID 4-Chave 5-Resultados 6-Regras 7-Suporte 8-Sair`);
  rl.question("Escolha: ", option => {
    switch (option) {
      case '1': return cadastrarMenu();
      case '2': return editarMenu();
      case '3': return bidMenu();
      case '4': return chaveMenu();
      case '5': return resultadosMenu();
      case '6': return regrasMenu();
      case '7': return suporteMenu();
      case '8': console.log("Tchau!"); return rl.close();
      default: return menuPrincipal();
    }
  });
}

module.exports = menuPrincipal;
