const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Arrays globais
const times = carregarTimesTeste(true);
const tickets = [];
let chaveamentos = [];
const alfabeto = gerarAlfabeto();

// ======== INÍCIO ========
menuPrincipal();

function menuPrincipal() {
  console.log(`\n==== Menu Principal ====\n
1 - Cadastrar time
2 - Editar time
3 - BID (Banco Interno de Dados)
4 - Chaveamento
5 - Resultados
6 - Regras e Regulamento
7 - Suporte
8 - Sair\n`);

  rl.question("Escolha: ", (input) => {
    const opcao = parseInt(input);

    if (isNaN(opcao) || opcao < 1 || opcao > 8) {
      console.log(`❌ Opção inválida: ${input}`);
      return menuPrincipal();
    }

    switch (opcao) {
      case 1:
        cadastrarTime();
        break;
      case 2:
        editarTime();
        break;
      case 3:
        menuBID();
        break;
      case 4:
        menuChaveamento();
        break;
      case 5:
        registrarResultados();
        break;
      case 6:
        mostrarRegras();
        break;
      case 7:
        menuSuporte();
        break;
      case 8:
        console.log("\n==== Você saiu. Tchau! ====");
        rl.close();
        break;
    }
  });
}

// ======== FUNÇÕES MENU PRINCIPAL ========

//-- Cadastrar
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

function registrarPlayers(time) {
  rl.question("Quantidade de players (5 a 10): ", (q) => {
    const qtd = parseInt(q);
    if (isNaN(qtd) || qtd < 5 || qtd > 10) {
      console.log("❌ Quantidade inválida.");
      return registrarPlayers(time);
    }
    cadastrarPlayers(time, qtd, 1);
  });
}

function cadastrarPlayers(time, total, index) {
  if (index > total) {
    console.log("\n✅ Todos os jogadores cadastrados!\n");
    console.log(JSON.stringify(time, null, 2));
    return menuSaida();
  }
  console.log(`\n==== Player ${index} de ${total} ==== `);
  rl.question("Nome completo: ", (nomeP) => {
    if (!nomeP || /^\d+$/.test(nomeP)) {
      console.log("❌ Nome inválido.");
      return cadastrarPlayers(time, total, index);
    }
    rl.question("Nick do LoL + Tag (#1234): ", (nt) => {
      let [nickP, tagP] = nt.split("#").map((s) => s.trim());
      tagP = tagP || "BR1";
      rl.question("Discord: ", (discord) => {
        selecionarElo((elo, div) => {
          time.players.push({
            nome: nomeP,
            nickLoL: nickP,
            tagLoL: tagP,
            discord,
            elo: `${elo} ${div}`,
          });
          cadastrarPlayers(time, total, index + 1);
        });
      });
    });
  });
}

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

//-- Editar
function editarTime() {
  if (times.length === 0) {
    console.log("❌ Nenhum time cadastrado.");
    return menuSaida();
  }
  console.log("\n==== Editar time ====\n");
  times.forEach((t, i) => console.log(`${i + 1} - ${t.nome} [${t.tag}]`));
  rl.question("Selecione o time (número): ", (i) => {
    const idx = parseInt(i) - 1;
    if (isNaN(idx) || idx < 0 || idx >= times.length) return editarTime();
    const time = times[idx];
    rl.question(`Novo nome (${time.nome}): `, (nn) => {
      if (nn) time.nome = nn;
      rl.question(`Nova TAG (${time.tag}): `, (nt) => {
        if (nt) time.tag = nt.toUpperCase();
        console.log("✅ Time atualizado!\n", time);
        menuSaida();
      });
    });
  });
}

//-- BID
function menuBID() {
  console.log("\n==== Banco Interno de Dados ====\n1-Players 2-ADM 3-Voltar");
  rl.question("Opção: ", (o) => {
    const opt = parseInt(o);
    if (opt === 1) exibirBID(false);
    else if (opt === 2) loginADM(true, () => exibirBID(true));
    else if (opt === 3) menuPrincipal();
    else {
      console.log("❌ Opção inválida.");
      menuBID();
    }
  });
}

function exibirBID(mostrarAdm) {
  console.log("\n==== BID Players ====");
  if (times.length === 0) {
    console.log("❌ Nenhum time.");
    return menuSaida();
  }
  times.forEach((t) => {
    console.log(`\nTime: ${t.nome} [${t.tag}]`);
    if (mostrarAdm)
      console.log(
        `Capitão: ${t.capitao.nome} (${t.capitao.nickLoL}#${t.capitao.tagLoL}) - ${t.capitao.whatsapp}`
      );
    if (t.players.length === 0) console.log(" (Sem jogadores)");
    t.players.forEach((p, i) =>
      console.log(
        `${i + 1}. ${p.nome} (${p.nickLoL}#${p.tagLoL}) - ${p.elo} | Discord: ${
          p.discord
        }`
      )
    );
  });
  menuSaida();
}

//-- Chaveamento
function menuChaveamento() {
  console.log("\n==== Chaveamento ====\n1-Criar 2-Ver 3-Voltar");
  rl.question("Opção: ", (o) => {
    const opt = parseInt(o);
    if (opt === 1) criarChaveamento();
    else if (opt === 2) verChaveamento();
    else if (opt === 3) menuPrincipal();
    else {
      console.log("❌ Opção inválida.");
      menuChaveamento();
    }
  });
}

function criarChaveamento() {
  if (times.length < 2) {
    console.log("❌ Precisam haver ao menos 2 times.");
    return menuChaveamento();
  }
  const embaralhado = [...times].sort(() => Math.random() - 0.5);
  chaveamentos = [];
  for (let i = 0; i < embaralhado.length; i += 2) {
    const a = embaralhado[i];
    const b = embaralhado[i + 1] || null;
    chaveamentos.push({ timeA: a, timeB: b, vencedor: null });
  }
  console.log("✅ Chaveamento criado!\n");
  verChaveamento();
}

function verChaveamento() {
  if (chaveamentos.length === 0) {
    console.log("❌ Nenhum chaveamento definido.");
    return menuChaveamento();
  }
  console.log("\n==== Chaveamento Atual ====");
  chaveamentos.forEach((m, i) => {
    const a = m.timeA.tag;
    const b = m.timeB ? m.timeB.tag : "--";
    const win = m.vencedor ? ` (Vencedor: ${m.vencedor.tag})` : "";
    console.log(`${i + 1}: ${a} vs ${b}${win}`);
  });
  menuSaida();
}

function registrarResultados() {
  if (chaveamentos.length === 0) {
    console.log("❌ Primeiro crie um chaveamento.");
    return menuSaida();
  }
  let idx = 0;
  function proximo() {
    if (idx >= chaveamentos.length) {
      console.log("\n✅ Resultados registrados!\n");
      return verChaveamento();
    }
    const jogo = chaveamentos[idx];
    console.log(
      `\nJogo ${idx + 1}: ${jogo.timeA.tag} vs ${
        jogo.timeB ? jogo.timeB.tag : "---"
      }`
    );
    rl.question(
      `Vencedor (1=${jogo.timeA.tag} 2=${
        jogo.timeB ? jogo.timeB.tag : "---"
      }): `,
      (r) => {
        const opc = parseInt(r);
        if (opc === 1) jogo.vencedor = jogo.timeA;
        else if (opc === 2 && jogo.timeB) jogo.vencedor = jogo.timeB;
        else {
          console.log("❌ Opção inválida.");
          return;
        }
        idx++;
        proximo();
      }
    );
  }
  proximo();
}

function mostrarRegras() {
  console.log(
    "\n==== Regras e Regulamento ====\n1- Cada time deve ter 5 a 10 jogadores.\n2- Formato de chaveamento simples eliminação.\n3- Partidas melhor de 3.\n4- Sem conduta tóxica.\n"
  );
  menuSaida();
}

//-- Suporte
function menuSuporte() {
  console.log(
    "\n==== Suporte ====\n1-Enviar ticket 2-Ver tickets 3-Responder ticket 4-Excluir ticket 5-Voltar"
  );
  rl.question("Opção: ", (o) => {
    const opt = parseInt(o);
    if (opt === 1) enviarTicket();
    else if (opt === 2) verRespostas();
    else if (opt === 3) responderTicket();
    else if (opt === 4) excluirTicket();
    else if (opt === 5) menuPrincipal();
    else {
      console.log("❌ Opção inválida.");
      menuSuporte();
    }
  });
}

function enviarTicket() {
  rl.question("Descreva o problema (máx 500 chars): ", (msg) => {
    const texto = msg.slice(0, 500);
    tickets.push({ mensagem: texto, resposta: null });
    console.log("✅ Ticket enviado!\n", texto);
    menuSaida();
  });
}

function verRespostas() {
  console.log("\n==== Tickets ====\n");
  if (tickets.length === 0) {
    console.log("Nenhum ticket.");
    return menuSaida();
  }
  tickets.forEach((t, i) =>
    console.log(`${i + 1}: ${t.mensagem}\n  Resposta: ${t.resposta || "---"}\n`)
  );
  menuSaida();
}

function responderTicket() {
  const pendentes = tickets.filter((t) => !t.resposta);
  if (pendentes.length === 0) {
    console.log("Nenhum ticket pendente.");
    return menuSaida();
  }
  pendentes.forEach((t, i) => console.log(`${i + 1}: ${t.mensagem}`));
  rl.question("Selecione ticket (número): ", (i) => {
    const idx = parseInt(i) - 1;
    if (isNaN(idx) || idx < 0 || idx >= pendentes.length)
      return responderTicket();
    rl.question("Resposta: ", (resp) => {
      pendentes[idx].resposta = resp;
      console.log("✅ Resposta registrada.");
      menuSaida();
    });
  });
}

function excluirTicket() {
  if (tickets.length === 0) {
    console.log("Nenhum ticket.");
    return menuSaida();
  }
  tickets.forEach((t, i) => console.log(`${i + 1}: ${t.mensagem}`));
  rl.question("Excluir ticket (número): ", (i) => {
    const idx = parseInt(i) - 1;
    if (isNaN(idx) || idx < 0 || idx >= tickets.length) return excluirTicket();
    tickets.splice(idx, 1);
    console.log("✅ Ticket excluído.");
    menuSaida();
  });
}

// ======== FUNÇÕES DE UTILIDADE ========

function menuSaida() {
  console.log("\n1-Voltar menu principal 2-Sair");
  rl.question("Opção: ", (o) => {
    if (o === "1") return menuPrincipal();
    if (o === "2") return rl.close();
    console.log("❌ Opção inválida.");
    menuSaida();
  });
}

function loginADM(retornarMenu, callback) {
  const credenciais = [
    { login: "teste@gmail", senha: "testesenha1" },
    { login: "teste2@gmail", senha: "testesenha2" },
  ];
  rl.question("Login: ", (u) => {
    rl.question("Senha: ", (s) => {
      const ok = credenciais.some((c) => c.login === u && c.senha === s);
      if (ok) {
        console.log("✅ Acesso liberado!");
        return callback();
      }
      console.log("❌ Acesso negado!");
      if (retornarMenu) return menuPrincipal();
      loginADM(true, callback);
    });
  });
}

function gerarAlfabeto() {
  const arr = [];
  for (let i = 65; i <= 90; i++)
    arr.push(String.fromCharCode(i), String.fromCharCode(i).toLowerCase());
  return arr;
}

function carregarTimesTeste(load = true) {
  if (!load) {
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
}
