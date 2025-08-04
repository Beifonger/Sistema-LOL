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
module.exports ={menuPrincipal};