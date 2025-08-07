const rl = require("../../utils/rl");
const { times } = require("../../dataStore");
const menuSaida = require("../exitMenu");

module.exports = function editarTime() {
  if (!times.length) return menuSaida();
  times.forEach((t,i) => console.log(`${i+1}- ${t.nome} [${t.tag}]`));
  rl.question("Selecione (número): ", i => {
    const tm = times[parseInt(i,10)-1];
    rl.question(`Novo nome (${tm.nome}): `, nn => {
      if(nn) tm.nome = nn;
      rl.question(`Nova TAG (${tm.tag}): `, nt => {
        if(nt) tm.tag = nt.toUpperCase();
        console.log("✅ Atualizado", tm);
        menuSaida();
      });
    });
  });
};
