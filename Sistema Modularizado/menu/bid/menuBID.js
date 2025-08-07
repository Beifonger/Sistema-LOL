const rl = require("../../utils/rl");
const { times } = require("../../dataStore");
const loginADM = require("../../utils/authADM");
const menuSaida = require("../exitMenu");

module.exports = function menuBID() {
  console.log("1-Players 2-ADM 3-Voltar");
  rl.question("Opção: ", o => {
    if(o==='1') mostrar(false);
    else if(o==='2') loginADM(true,()=>mostrar(true));
    else if(o==='3') return require("../index")();
    else return menuBID();
  });
  function mostrar(adm) {
    times.forEach(t => {
      console.log(t.nome, `[${t.tag}]`);
      if(adm) console.log(t.capitao);
      t.players.forEach(p => console.log(p));
    });
    menuSaida();
  }
};
