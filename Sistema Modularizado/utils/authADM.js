const rlAuth = require("./rl");
const credenciais = [
  { login: "teste@gmail.com", senha: "testesenha1" },
  { login: "teste2@gmail.com", senha: "testesenha2" }
];

module.exports = function loginADM(retornarMenu, callback) {
  rlAuth.question("Login: ", user => {
    rlAuth.question("Senha: ", pass => {
      const ok = credenciais.some(c => c.login === user && c.senha === pass);
      if (ok) {
        console.log("✅ Acesso liberado!");
        return callback();
      }
      console.log("❌ Acesso negado!");
      if (retornarMenu) return require("../menu/index")();
      loginADM(true, callback);
    });
  });
};
