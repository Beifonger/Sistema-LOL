const registrarPlayers = require("./2-registrarPlayer.js")
const rl = require("../../../Funções de utilidade/rl.js")

cadastrarTime();
function cadastrarTime() {
  console.log("\n==== Cadastrar time ====");
  rl.question("Nome do time: ", (nome) => {
    if (!nome || !nome.split("").every((c) => alfabeto.includes(c))) {
      console.log("❌ Nome inválido. Use apenas letras a-z/A-Z.");
      return cadastrarTime();
    }
    solicitarTag(nome);
  });

  function solicitarTag(nomeTime) {
    rl.question("TAG do time: ", (tagInput) => {
      const tag = tagInput.toUpperCase();
      if (tag.length < 2 || tag.length > 3) {
        console.log("❌ A TAG deve ter entre 2 e 3 caracteres.");
        return solicitarTag(nomeTime);
      }
      const letrasValidas = nomeTime
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .split("");
      if (!tag.split("").every((c) => letrasValidas.includes(c))) {
        console.log("❌ A TAG contém caracteres inválidos.");
        return solicitarTag(nomeTime);
      }
      console.log(`✅ TAG aceita: ${tag}`);
      cadastrarCapitao(nomeTime, tag);
    });
  }

  function cadastrarCapitao(nomeTime, tagTime) {
    console.log("\n--> Cadastrar capitão");
    rl.question("Nome do capitão: ", (nomeCap) => {
      if (!nomeCap) {
        console.log("❌ Nome inválido.");
        return cadastrarCapitao(nomeTime, tagTime);
      }
      rl.question("Nick do LoL + Tag (#1234): ", (nickTag) => {
        let [nick, riotTag] = nickTag.split("#").map((s) => s.trim());
        riotTag = riotTag || "BR1";
        const time = {
          nome: nomeTime,
          tag: tagTime,
          capitao: { nome: nomeCap, nickLoL: nick, tagLoL: riotTag },
          players: [],
        };

        function solicitarWhatsApp() {
          rl.question("Número de WhatsApp (somente dígitos): ", (wh) => {
            if (
              wh.length < 11 ||
              wh.length > 12 ||
              ![...wh].every((d) => d >= "0" && d <= "9")
            ) {
              console.log(
                "❌ Número inválido. Deve ter 11 a 12 dígitos numéricos."
              );
              return solicitarWhatsApp();
            }
            time.capitao.whatsapp = wh;
            times.push(time);
            console.log("✅ Capitão cadastrado com sucesso!\n");
            registrarPlayers(time);
          });
        }

        solicitarWhatsApp();
      });
    });
  }
}

module.exports = cadastrarTime;
