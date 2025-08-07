const rl = require("../../utils/rl");
const { times } = require("../../dataStore");

module.exports = function cadastrarCapitao(nomeTime, tagTime) {
  rl.question("Nome do capitão: ", nomeCap => {
    rl.question("NickLoL + Tag (#1234): ", nickTag => {
      const [nick, riotTag] = nickTag.split("#");
      const time = {
        nome: nomeTime,
        tag: tagTime,
        capitao: { nome: nomeCap, nickLoL: nick, tagLoL: riotTag || "BR1" },
        players: []
      };
      rl.question("WhatsApp (11-12 dígitos): ", wh => {
        time.capitao.whatsapp = wh;
        times.push(time);
        console.log("✅ Time e capitão cadastrados!\n");
        require("../cadastrar/registrarPlayers")(time);
      });
    });
  });
};
