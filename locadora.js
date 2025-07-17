let prompt = require('prompt-sync')();
let cliente = []; // Lista de clientes
let filme = []; // Lista de filmes disponíveis

let opcao; // Variável para armazenar a opção do menu

let senhaCorreta = 'senai123';
let tentativasenha = 0;
let acessoConcedido = false;

while (tentativasenha < 3) {
    let senhadigitada = prompt('digite a senha para acessar o sistema: ');
    if (senhadigitada === senhaCorreta) {
        console.log('senha correta! acesso concedido.');
        acessoConcedido = true;
        break;
    } else {
        tentativasenha++;
        console.log('senha incorreta. tentativas restantes: ' + (3 - tentativasenha));
    }
}

if (tentativasenha === 3) {
    console.log('acesso não autorizado. você excedeu o numero de tentativas');
    process.exit();
}

function cadastrarfilme() {
    let nomefilme = prompt('Digite o nome do filme que deseja cadastrar: ');
    if (nomefilme && nomefilme.trim() !== '') {
        filme.push({ nome: nomefilme.trim(), cliente: null });
        console.log("Filme cadastrado com sucesso!");
    } else {
        console.log("Nome inválido.");
    }
}

function excluirfilme() {
    let nomeExcluir = prompt('Digite o nome do filme a excluir: ');
    let index = filme.findIndex(f => f.nome === nomeExcluir);
    if (index !== -1) {
        filme.splice(index, 1);
        console.log("Filme excluído com sucesso!");
    } else {
        console.log("Filme não encontrado.");
    }
}

function cadastrarcliente() {
    let nomecliente = prompt('Digite o nome do cliente: ');
    if (nomecliente && nomecliente.trim() !== '') {
        cliente.push({ nome: nomecliente.trim(), filme: null });
        console.log("Cliente cadastrado com sucesso!");
    } else {
        console.log("Nome inválido.");
    }
}

function removercliente() {
    let remover = prompt('Digite o nome do cliente a excluir: ');
    let index = cliente.findIndex(c => c.nome === remover);
    if (index !== -1) {
        cliente.splice(index, 1);
        for (let i = 0; i < cliente.length; i++) {
            if (cliente[i].filme === remover) {
                cliente[i].filme = null;
            }
        }
        console.log("Cliente removido com sucesso!");
    } else {
        console.log("Cliente não encontrado.");
    }
}

function visualizarinformacoes() {
    let info = '\nclientes Cadastrados:\n';
    if (cliente.length > 0) {
        for (let i = 0; i < cliente.length; i++) {
            let clientes = cliente[i];
            let filmeInfo = clientes.filme ? clientes.filme : 'Sem filme';
            info += ` ${clientes.nome} (${filmeInfo})\n`;
        }
    } else {
        info += 'Nenhum cliente cadastrado.\n';
    }

    info += '\nFilmes cadastrados:\n';
    if (filme.length > 0) {
        for (let i = 0; i < filme.length; i++) {
            info += `- ${filme[i].nome}\n`;
        }
    } else {
        info += 'Nenhum filme cadastrado.\n';
    }

    console.log(info);
}

function cadastrarclienteparafilme() {
    let Clientenome = prompt('Digite o nome do cliente: ');
    let clienteencontrado = cliente.find(a => a.nome === Clientenome);

    if (!clienteencontrado) {
        console.log("cliente não encontrado.");
        return;
    } else if (filme.length === 0) {
        console.log("Nenhum filme disponível.");
        return;
    }

    console.log("\nfilmes disponíveis:");
    for (let i = 0; i < filme.length; i++) {
        console.log(`${i + 1} - ${filme[i].nome}`);
    }

    let numfilme = parseInt(prompt('Digite o número do filme desejado: '));

    if (numfilme >= 1 && numfilme <= filme.length) {
        clienteencontrado.filme = filme[numfilme - 1].nome;
        console.log("Cliente agendado com sucesso!");
    } else {
        console.log("Número do filme inválido.");
    }
}

function sairdosistema() {
    console.log("Saindo do sistema...");
}

do {
    opcao = prompt(
        'Sistema Locadora\n\n' +
        '1 - Cadastrar filme\n' +
        '2 - Excluir filme\n' +
        '3 - Cadastrar cliente\n' +
        '4 - Remover cliente\n' +
        '5 - Visualizar Informações\n' +
        '6 - Matricular cliente para filme\n' +
        '7 - Sair\n\n' +
        'Escolha uma opção:\n'
    );

    switch (opcao) {
        case '1':
            cadastrarfilme();
            break;
        case '2':
            excluirfilme();
            break;
        case '3':
            cadastrarcliente();
            break;
        case '4':
            removercliente();
            break;
        case '5':
            visualizarinformacoes();
            break;
        case '6':
            cadastrarclienteparafilme();
            break;
        case '7':
            sairdosistema();
            break;
        default:
            console.log("Opção inválida.");
    }

} while (opcao !== '7');



