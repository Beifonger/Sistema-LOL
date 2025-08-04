function carregarTimesTeste(load = true) {
    if (load) {
      return [
        {
          nome: "Furia E-Sports",
          tag: "FUR",
          capitao: {
            nome: "Carlos Alberto",
            nickLoL: "FURCarlin",
            tagLoL: "1111",
            whatsapp: "11999999999",
          },
          players: [
            {
              nome: "Lucas Oliveira",
              nickLoL: "Luquinhas",
              tagLoL: "1234",
              discord: "Luquinhas#0001",
              elo: "DIAMANTE I",
            },
            {
              nome: "Marcos Silva",
              nickLoL: "Marcão",
              tagLoL: "2222",
              discord: "Marcao#1234",
              elo: "PLATINA II",
            },
            {
              nome: "João Pedro",
              nickLoL: "JpGod",
              tagLoL: "3333",
              discord: "JpGod#3333",
              elo: "OURO I",
            },
            {
              nome: "Thiago Santos",
              nickLoL: "ThiZada",
              tagLoL: "4444",
              discord: "ThiZada#4444",
              elo: "DIAMANTE IV",
            },
            {
              nome: "Ricardo Mendes",
              nickLoL: "RicMaster",
              tagLoL: "5555",
              discord: "RicMaster#5555",
              elo: "PLATINA III",
            },
          ],
        },
        {
          nome: "Pain Gaming",
          tag: "PNG",
          capitao: {
            nome: "Felipe Araújo",
            nickLoL: "PainFelps",
            tagLoL: "9999",
            whatsapp: "11988888888",
          },
          players: [
            {
              nome: "André Costa",
              nickLoL: "Andrezin",
              tagLoL: "6666",
              discord: "Andrezin#6666",
              elo: "CHALLENGER I",
            },
            {
              nome: "Gustavo Rocha",
              nickLoL: "GugaTop",
              tagLoL: "7777",
              discord: "GugaTop#7777",
              elo: "GRÃO MESTRE II",
            },
            {
              nome: "Pedro Martins",
              nickLoL: "MartinsBR",
              tagLoL: "8888",
              discord: "Martins#8888",
              elo: "MESTRE IV",
            },
            {
              nome: "Lucas Ferreira",
              nickLoL: "LFer",
              tagLoL: "1212",
              discord: "LFer#1212",
              elo: "DIAMANTE II",
            },
            {
              nome: "Rafael Lima",
              nickLoL: "RafaMid",
              tagLoL: "3434",
              discord: "RafaMid#3434",
              elo: "OURO III",
            },
          ],
        },
      ];
    }
    return []
  }

// EXPORTANDO  
module.exports = carregarTimesTeste;
