const rl = require("../../utils/rl");
const { alfabeto } = require("../../dataStore");

module.exports = function solicitarTag(nomeTime) {
  rl.question("TAG do time: ", tagInput => {
    const tag = tagInput.toUpperCase();
    if (tag.length < 2 || tag.length > 3 || !tag.split("").every(c => nomeTime.toUpperCase().includes(c))) {
      return solicitarTag(nomeTime);
    }
    console.log(`✅ TAG aceita: ${tag}`);
    require("./cadastrarCapitao")(nomeTime, tag);
  });
};
