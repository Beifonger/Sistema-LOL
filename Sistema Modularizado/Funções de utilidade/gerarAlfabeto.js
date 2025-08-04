function gerarAlfabeto() {
    const alfabeto = [];
    for (let i = 65; i <= 90; i++) {
      alfabeto.push(String.fromCharCode(i));
      alfabeto.push(String.fromCharCode(i + 32));
    }
    return alfabeto;
  }
  
  // EXPORTANDO  
  module.exports = gerarAlfabeto;