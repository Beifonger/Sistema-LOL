const selecionarElo = require("./4-selecionarElo.js")

function cadastrarPlayers(time, total, index) {
    if (index > total) {
      console.log("\n✅ Todos os jogadores cadastrados!\n");
      console.log(JSON.stringify(time, null, 2));
      return menuSaida();
    }
    console.log(`\n==== Player ${index} de ${total} ==== `);
    rl.question("Nome completo: ", (nomeP) => {
      if (!nomeP || /^\d+$/.test(nomeP)) {
        console.log("❌ Nome inválido.");
        return cadastrarPlayers(time, total, index);
      }
      rl.question("Nick do LoL + Tag (#1234): ", (nt) => {
        let [nickP, tagP] = nt.split("#").map((s) => s.trim());
        tagP = tagP || "BR1";
        rl.question("Discord: ", (discord) => {
          selecionarElo((elo, div) => {
            time.players.push({
              nome: nomeP,
              nickLoL: nickP,
              tagLoL: tagP,
              discord,
              elo: `${elo} ${div}`,
            });
            cadastrarPlayers(time, total, index + 1);
          });
        });
      });
    });
  }

module.exports = cadastrarPlayers;