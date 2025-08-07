module.exports = function gerarAlfabeto() {
  const letras = [];
  for (let i = 65; i <= 90; i++) {
    letras.push(String.fromCharCode(i));
    letras.push(String.fromCharCode(i).toLowerCase());
  }
  return letras;
};
