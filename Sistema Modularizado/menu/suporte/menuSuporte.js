const rl = require("../../utils/rl");
const { tickets } = require("../../dataStore");
const menuSaida = require("../exitMenu");

module.exports = function menuSuporte() {
  console.log("1-Enviar 2-Ver 3-Responder 4-Excluir 5-Voltar");
  rl.question("Opção: ", o=>{
    if(o==='1') return enviar();
    if(o==='2') return ver();
    if(o==='3') return responder();
    if(o==='4') return excluir();
    if(o==='5') return require("../index")();
    menuSuporte();
  });
};
function enviar() { rl.question("Problema: ", m=>{ tickets.push({ mensagem: m, resposta: null }); console.log("✅"); menuSaida(); }); }
function ver() { tickets.forEach((t,i)=>console.log(`${i+1}: ${t.mensagem} - ${t.resposta||"--"}`)); menuSaida(); }
function responder() {
  const pend = tickets.filter(t=>!t.resposta);
  pend.forEach((t,i)=>console.log(`${i+1}: ${t.mensagem}`));
  rl.question("Selecione: ", i=>{ pend[i-1].resposta = rl._writeToOutput; menuSaida(); });
}
function excluir() { rl.question("Selecione para excluir: ", i=>{ tickets.splice(parseInt(i,10)-1,1); menuSaida(); }); }
