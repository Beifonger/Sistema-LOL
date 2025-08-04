function selecionarElo(callback) {
    console.log(`
  1-Ferro 2-Bronze 3-Prata 4-Gold 5-Platina 6-Diamante 7-Mestre 8-Grão Mestre 9-Challenger`);
    rl.question("Elo (1-9): ", (e) => {
      const n = parseInt(e);
      const elos = [
        "FERRO",
        "BRONZE",
        "PRATA",
        "GOLD",
        "PLATINA",
        "DIAMANTE",
        "MESTRE",
        "GRÃO MESTRE",
        "CHALLENGER",
      ];
      if (isNaN(n) || n < 1 || n > 9) return selecionarElo(callback);
      const elo = elos[n - 1];
      console.log(`1-${elo} I 2-${elo} II 3-${elo} III 4-${elo} IV`);
      rl.question("Divisão (1-4): ", (d) => {
        const m = parseInt(d);
        const divs = ["I", "II", "III", "IV"];
        if (isNaN(m) || m < 1 || m > 4) return selecionarElo(callback);
        callback(elo, divs[m - 1]);
      });
    });
  }

  module.exports = selecionarElo;