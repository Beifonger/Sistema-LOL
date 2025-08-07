const rl = require("../../utils/rl");
const { chaveamentos } = require("../../dataStore");
const menuSaida = require("../exitMenu");

module.exports = function registrarResultados() {
  if(!chaveamentos.length) return menuSaida();
  let i=0;
  (function next() {
    if(i>=chaveamentos.length) return menuSaida();
    const gm = chaveamentos[i++];
    rl.question(`Vencedor (1=${gm.timeA.tag} 2=${gm.timeB?gm.timeB.tag:""}): `, r=>{
      gm.vencedor = r==='1'?gm.timeA:gm.timeB;
      next();
    });
  })();
};
