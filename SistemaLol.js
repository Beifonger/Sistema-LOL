//======== READLINE ========

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let Times = [
    {
        nome: "Furia E-Sports",
        tag: "FUR",
        capitao: {
            nome: "Carlos Alberto",
            nickLoL: "FURCarlin",
            tagLoL: "1111",
            whatsapp: "11999999999"
        },
        players: [
            {
                nome: "Lucas Oliveira",
                nickLoL: "Luquinhas",
                tagLoL: "1234",
                discord: "Luquinhas#0001",
                elo: "DIAMANTE I"
            },
            {
                nome: "Marcos Silva",
                nickLoL: "Marcão",
                tagLoL: "2222",
                discord: "Marcao#1234",
                elo: "PLATINA II"
            },
            {
                nome: "João Pedro",
                nickLoL: "JpGod",
                tagLoL: "3333",
                discord: "JpGod#3333",
                elo: "OURO I"
            },
            {
                nome: "Thiago Santos",
                nickLoL: "ThiZada",
                tagLoL: "4444",
                discord: "ThiZada#4444",
                elo: "DIAMANTE IV"
            },
            {
                nome: "Ricardo Mendes",
                nickLoL: "RicMaster",
                tagLoL: "5555",
                discord: "RicMaster#5555",
                elo: "PLATINA III"
            }
        ]
    },
    {
        nome: "Pain Gaming",
        tag: "PNG",
        capitao: {
            nome: "Felipe Araújo",
            nickLoL: "PainFelps",
            tagLoL: "9999",
            whatsapp: "11988888888"
        },
        players: [
            {
                nome: "André Costa",
                nickLoL: "Andrezin",
                tagLoL: "6666",
                discord: "Andrezin#6666",
                elo: "CHALLENGER I"
            },
            {
                nome: "Gustavo Rocha",
                nickLoL: "GugaTop",
                tagLoL: "7777",
                discord: "GugaTop#7777",
                elo: "GRÃO MESTRE II"
            },
            {
                nome: "Pedro Martins",
                nickLoL: "MartinsBR",
                tagLoL: "8888",
                discord: "Martins#8888",
                elo: "MESTRE IV"
            },
            {
                nome: "Lucas Ferreira",
                nickLoL: "LFer",
                tagLoL: "1212",
                discord: "LFer#1212",
                elo: "DIAMANTE II"
            },
            {
                nome: "Rafael Lima",
                nickLoL: "RafaMid",
                tagLoL: "3434",
                discord: "RafaMid#3434",
                elo: "OURO III"
            }
        ]
    },
    {
        nome: "INTZ",
        tag: "INZ",
        capitao: {
            nome: "Gabriel Souza",
            nickLoL: "INTZGabs",
            tagLoL: "5656",
            whatsapp: "11977777777"
        },
        players: [
            {
                nome: "Mateus Almeida",
                nickLoL: "MatAlm",
                tagLoL: "7878",
                discord: "MatAlm#7878",
                elo: "PRATA I"
            },
            {
                nome: "Renan Cruz",
                nickLoL: "RenanRox",
                tagLoL: "9090",
                discord: "RenanRox#9090",
                elo: "BRONZE III"
            },
            {
                nome: "Henrique Lopes",
                nickLoL: "HenriqL",
                tagLoL: "1112",
                discord: "HenriqL#1112",
                elo: "OURO IV"
            },
            {
                nome: "Igor Santana",
                nickLoL: "IgorOP",
                tagLoL: "3435",
                discord: "IgorOP#3435",
                elo: "PLATINA IV"
            },
            {
                nome: "Paulo Cesar",
                nickLoL: "PCes",
                tagLoL: "7879",
                discord: "PCes#7879",
                elo: "DIAMANTE III"
            }
        ]
    }
];

//======== FUNÇÃO PRINCIPAl ========

menuPrincipal();
function menuPrincipal() {
    console.log(`
==== Menu Principal ====

1 - Cadastrar TIME;
2 - Editar TIME;
3 - BID (Banco interno de Dados);
4 - Chaveamento;
5 - Resultados;
6 - Regras e Regulamento;
7 - Suporte;
8 - Sair;
`);

    rl.question("RESPOSTA: ", (input) => {
        const escolha = parseInt(input);

        if (isNaN(escolha) || escolha < 1 || escolha > 8) {
            console.log(`\n❌ "${input}" não é uma opção válida!`);
            return menuSaida();
        }

        switch (escolha) {
            case 1: cadastrarTime(1); break;
            case 2: menuEditarTime(); break;
            case 3: bancoInternoDeDados(); break;
            case 4: chaveamento(); break;
            case 5: resultados(); break;
            case 6: regrasRegulamentos(); break;
            case 7: suporteMenu(); break;
            case 8:
                console.log("\n==== Você saiu. Tchau! ====");
                rl.close();
                break;
        }
    });
}

//======== FUNÇÕES DO MENU ========

// -- CADASTRAR --

function cadastrarTime(controle = 1) {
    if (controle === 1){console.log("\n==== Cadastrar TIME ====\n");}

    const validarLetras = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
      ]; 

    rl.question("Nome do TIME: ", (inputNomeTime) => {
        
        if (inputNomeTime.length === 0){
            console.log(`você deixou o campo em branco!`); return cadastrarTime(2);
            }
        if (!inputNomeTime.split("").every(a => validarLetras.includes(a))){
            console.log(`Nome de time invalido!(use: a-z / A-Z)`)
            return cadastrarTime(2);
        }
        solicitarTag(inputNomeTime);
    });

    function solicitarTag(nomeDoTime) {
        const letrasValidas = nomeDoTime.toUpperCase().replace(/[^A-Z]/g, "").split("");
        // nome do time: ma_ngo1988 // MA_NGO1988 // MANGO // [M, A, N, G, O]

        rl.question("TAG do TIME: ", (inputTagTime) => {
            const Tag = inputTagTime.toUpperCase(); 
            const validaTag = Tag.split('').every(letra => letrasValidas.includes(letra));
            // MAG // [M, A, G] // tem M, A e G no [M, A, N, G, O]? SIM // True

            if (!validaTag) { //True vira False //
                console.log("❌ A TAG contém letras que não estão no nome do time.");
                return solicitarTag(nomeDoTime);
            }

            console.log(`✅ TAG aceita: ${Tag}`);
            cadastrarCapitao(nomeDoTime, Tag);
        });
    }

    function cadastrarCapitao(nomeTime, tagTime) {
        console.log("\n--> Cadastrar CAPITÃO:\n");

        rl.question("Nome do capitão: ", (nomeCapitao) => {
            if (!isNaN(nomeCapitao)){
                console.log(`digte um nome valido!`)
            }

            rl.question("Nick do LoL + Tag (ex: Beifonger#1234): ", (inputNickETag) => {
                let [nick, riotTag] = inputNickETag.split('#').map(p => p.trim());

                if (!riotTag){
                    console.log(`TAG considearada como "BR1"  ||  ${nick}#BR1`);
                    riotTag = "BR1";
                }
                numeroWhats();
                function numeroWhats(){
                    rl.question("Número de WhatsApp: ", (whatsapp) => {
                    let numeroZap = parseInt(whatsapp)
                    
                        if (isNaN(numeroZap) || numeroZap.length < 11 || numeroZap.length > 12){
                            console.log(`O Número: ${whatsapp}, não é valido!`)
                            return numeroWhats();                      
                        }   

                    const time = {
                        nome: nomeTime,
                        tag: tagTime,
                        capitao: {
                            nome: nomeCapitao,
                            nickLoL: nick,
                            tagLoL: riotTag,
                            whatsapp: whatsapp
                        },
                        players: []
                    };

                    Times.push(time);
                    console.log(`\n✅ Capitão cadastrado com sucesso!`);
                    registroPlayers(time);
                });
                }
            });
        });
    }
}

function registroPlayers(time) {
    rl.question(`\nQuantidade de Players (5 a 10): `, (inputQuantidadePlayers) => {
        const quantidadePlayers = parseInt(inputQuantidadePlayers);

        if (isNaN(quantidadePlayers)){
            console.log(`❌ a resposta: ${quantidadePlayers} não é valida como opção!`)
            return registroPlayers(time)
        }
        if (quantidadePlayers < 5) {
            console.log(`❌ Seu time deve ter no mínimo 5 Players!`);
            return registroPlayers(time);
        }
        if (quantidadePlayers > 10) {
            console.log(`❌ Seu time não pode ter mais de 10 Players!`);
            return registroPlayers(time);
        }

        perguntasPlayer(time, quantidadePlayers, 1);
    });
}

function perguntasPlayer(time, quantidade, i) {
    if (i > quantidade) {
        console.log(`\n✅ Todos os jogadores foram cadastrados com sucesso!`);
        console.log("Time completo:\n", JSON.stringify(time, null, 2));
        return menuSaida();
    }

    console.log(`\n==== Cadastrando Player ${i} de ${quantidade} ====`);

    rl.question("Nome Completo: ", (nome) => {
    const respostaNome = parseInt(nome)
        if (!isNaN(nome) || respostaNome.length === 0){
            console.log(`digte um nome valido!`)
            return perguntasPlayer (time, quantidade, i)
        }
        rl.question("Nick do LoL + Tag (ex: Beifonger#1234): ", (inputNickETag) => {
            let [nick, riotTag] = inputNickETag.split('#').map(p => p.trim());
            if (!riotTag){
                console.log(`TAG considearada como "BR1"  ||  ${nick}#BR1`);
                riotTag = "BR1";
            }
kjbh
            rl.question("Discord: ", (discord) => {
                perguntarElo((elosAtual, divisaoElo) => {
                    time.players.push({
                        nome,
                        nickLoL: nick,
                        tagLoL: riotTag,
                        discord,
                        elo: `${elosAtual} ${divisaoElo}`
                    });
                    perguntasPlayer(time, quantidade, i + 1);
                });
            });
        });
    });
}

function perguntarElo(callback) {
    console.log(`
Digite o número do seu elo atual:
1 - Ferro
2 - Bronze
3 - Prata
4 - Gold
5 - Platina
6 - Diamante
7 - Mestre
8 - Grão Mestre
9 - Challenger
`);

    rl.question("Resposta (1 a 9): ", (inputElo) => {
        const eloNum = parseInt(inputElo);
        const elos = ["FERRO", "BRONZE", "PRATA", "GOLD", "PLATINA", "DIAMANTE", "MESTRE", "GRÃO MESTRE", "CHALLENGER"];

        if (isNaN(eloNum) || eloNum < 1 || eloNum > 9) {
            console.log("❌ Valor inválido. Digite um número de 1 a 9.");
            return perguntarElo(callback);
        }

        const eloEscolhido = elos[eloNum - 1];

        console.log(`
Qual a divisão?
1 - ${eloEscolhido} I
2 - ${eloEscolhido} II
3 - ${eloEscolhido} III
4 - ${eloEscolhido} IV
`);

        rl.question("Resposta (1 a 4): ", (inputDiv) => {
            const divNum = parseInt(inputDiv);
            const divisoes = ["I", "II", "III", "IV"];

            if (isNaN(divNum) || divNum < 1 || divNum > 4) {
                console.log("❌ Valor inválido. Digite um número de 1 a 4.");
                return perguntarElo(callback);
            }

            callback(eloEscolhido, divisoes[divNum - 1]);
        });
    });
}

// -- EDITAR --

function menuEditarTime() {
    console.log(`\n==== Menu Editar Time ====\n(Função em construção)`);
    menuPrincipal();
}

// -- BANCO INTERNO DE DADOS --

function bancoInternoDeDados() {
        console.log("\n==== BID ====\n")
        console.log("1 - BID (players):\n2 - BID (ADM): \n3 - Voltar\n")

        rl.question("Resposta: ", (inputBID) => {
            const respostaBID = parseInt(inputBID)

            switch(respostaBID){
                case 1: BIDplayers(visualAdm = false); break;
                case 2: BIDADM(); break;
                case 3: menuPrincipal(); break;
                default: console.log("❌ Resposta invalida!"); bancoInternoDeDados(); break;
            }
        });
}

function BIDplayers(visualAdm = false){
    console.log(`==== BID ====\n`);

    if (Times.length === 0) {
        console.log("❌ Nenhum time cadastrado ainda.");
        return menuPrincipal();
    }
    
    Times.forEach((time, i) => {
        console.log(`Time: ${time.nome} [${time.tag}] `);
        
        if(visualAdm){
            if (time.capitao.length === 0){
                console.log("Não há nenhum capitão cadastrado")
            } else {
                console.log(`Capitão: ${time.capitao.nome}`)
                console.log(`(${time.capitao.nickLoL}#${time.capitao.tagLoL}) - ${time.capitao.whatsapp}`);
            }
        }

        if (time.players.length === 0) {
            console.log("  (Sem jogadores cadastrados)");
            return menuSaida();
        } else {
            time.players.forEach((player, index) => {
            
                console.log(
                `${index + 1}. ${player.nome} (${player.nickLoL}#${player.tagLoL}) - ` +
                `${player.elo} | Discord: ${player.discord}`
                );  
            });
        }
        console.log("");
        });
    menuSaida();
}

function BIDADM() {
    loginAdm(false, function(success) {
        if (success) {
            BIDplayers(true);
        }
    });
}

// -- CHAVEAMENTO --

function chaveamento() {
    console.log(`==== Menu chaveamento ====`)
    console.log(`\n 1 - Criar Chaveamento(ADM):\n 2 - Ver Chaveamento:\n`)
    rl.question("Resposta: ", (inputMenuChaveamento)=>{
    const inputMenuChaveamentoEmNumero = parseInt(inputMenuChaveamento)

    switch(inputMenuChaveamentoEmNumero){
        case 1: criarChaveamento(); break;
        case 2: verChaveamento(); break;
        default: console.log(`❌ ${inputMenuChaveamentoEmNumero} Não é uma Resposta Valida!`); break;
    }
    });
    chaveamento();
}

function criarChaveamento(){
    console.log(`==== Menu criar chaveamento ====

    1 - Criar
    2 - Editar
    3 - Excluir
    
    
    `)
}

// -- RESULTADOS --

function resultados() {
    console.log("Função em construção...");
    menuPrincipal();
}

// -- REGRAS E REGULAMENTO --

function regrasRegulamentos() {
    console.log("Função em construção...");
    menuPrincipal();
}

// -- SUPORTE --

tickets = [];

function suporteMenu() {
console.log(`==== SUPORTE ====

1 - MANDAR TICKET
2 - SUPORTE WHATSAPP
3 - VER RESPOSTAS

-- ADM --
4 - RESPONDER TICKET
5 - DELETAR`);

rl.question("Resposta: ", (inputSuporte) =>{
    const RS = parseInt(inputSuporte)

    if (isNaN(RS) || RS > 5 || RS < 1){
        console.log(`A resposta ${RS}, não é valida!`)
        return suporteMenu();
    }

    switch(RS){
        case 1: mandarTicket(); break;
        case 2: suporteTicket(); break;
        case 3: verRespostas(); break;
        case 4: responderTicket(); break;
        case 5: deletarTicket(); break;
        
    }
});
}

function mandarTicket(){

    console.log(`ticket:\n`)


    
}

// ========== FUNÇÕES UTILITARIAS ==========

function menuSaida() {
    console.log(`\n==== Menu Saída ====
1 - Voltar para o Menu Principal;
2 - Sair;
`);

    rl.question("RESPOSTA: ", (input) => {
        const opcao = parseInt(input);
        if (opcao === 1) return menuPrincipal();
        if (opcao === 2) return rl.close();

        console.log("Opção inválida.");
        return menuSaida();
    });
}

function loginAdm(voltarMenu = false,  callback){

    let logins = [    
        { login:"teste@gmail", senha:"testesenha1"},
        { login:"teste2@gmail", senha:"testesenha2"}
    ];

    if (voltarMenu){rl.question("Voltar Menu (s/n)? ",(inputVoltarMenu) => {
        const respostaVoltarMenu = inputVoltarMenu.toUpperCase().split("").map(a=>a.trim()).filter(a=>a === "N" || a ==="S")[0];

        if (!respostaVoltarMenu){
            console.log("Digte uma resposta valida!")
            return(voltarMenu = true, callback)
        }
        if (respostaVoltarMenu === "S"){
            return menuPrincipal();
        }
        if(respostaVoltarMenu === "N"){
            console.log("voltando ao LOGIN!")
            return (loginAdm(voltarMenu = false, callback))
        }

    })}

    rl.question("Login: ", (inputLongin) =>{
        rl.question("Senha: ", (inputSenha) =>{

            let acessoLiberado = false
            for (let i = 0; i < logins.length; i ++){

                let VerificarLogin = (inputLongin === logins[i].login)
                let VerificarSenha = (inputSenha === logins[i].senha)

                if (VerificarLogin && VerificarSenha){
                    acessoLiberado = true
                    break;
                }
            }
            if (acessoLiberado){
                console.log("✅ Acesso liberado!")
                callback(true);
            }
            else {console.log("❌ Acesso negado!");
                return loginAdm(voltarMenu = true, callback)
            }
        });
    });
}