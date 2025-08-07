const rl = require("../../utils/rl");
const selecionarElo = require("./selecionarElo");
const menuSaida = require("../exitMenu");

module.exports = function registrarPlayers(time) {
  rl.question("Quantidade de players (5-10): ", q => {
    const total = parseInt(q, 10);
    if (isNaN(total) || total < 5 || total > 10) return registrarPlayers(time);
    function loop(i) {
      if (i > total) { console.log("✅ Jogadores cadastrados!\n", time); return menuSaida(); }
      rl.question("Nome completo: ", nomeP => {
        rl.question("NickLoL + Tag: ", nt => {
          rl.question("Discord: ", discord => {
            selecionarElo((elo, div) => {
              time.players.push({ nome: nomeP, nickLoL: nt.split("#")[0], tagLoL: nt.split("#")[1] || "BR1", discord, elo: `${elo} ${div}` });
              loop(i + 1);
            });
          });
        });
      });
    }
    loop(1);
  });
};
