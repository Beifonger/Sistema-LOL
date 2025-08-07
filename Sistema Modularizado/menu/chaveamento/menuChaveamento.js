const rl = require("../../utils/rl");
const { times, chaveamentos } = require("../../dataStore");
const menuSaida = require("../exitMenu");

module.exports = function menuChaveamento() {
  console.log("1-Criar 2-Ver 3-Voltar");
  rl.question("Opção: ", o => {
    if(o==='1') return criar();
    if(o==='2') return ver();
    if(o==='3') return require("../index")();
    menuChaveamento();
  });
};
function criar() {
  const arr = [...times].sort(()=>Math.random()-.5);
  chaveamentos.length = 0;
  for(let i=0; i<arr.length; i+=2) chaveamentos.push({ timeA: arr[i], timeB: arr[i+1]||null });
  console.log("✅ Criado");
  require("../index")();
}
function ver() {
  if(!chaveamentos.length) return require("../index")();
  chaveamentos.forEach((m,i)=>console.log(`${i+1}: ${m.timeA.tag} vs ${m.timeB?m.timeB.tag:"--"}`));
  menuSaida();
}
