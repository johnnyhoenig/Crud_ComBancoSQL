const emprestimoRepository = require('../repository/emprestimo_repository');
const clienteService = require('../repository/cliente_repository');
const livrosService = require('../repository/livros_repository');
const dataAtual = new Date();
const ano = dataAtual.getFullYear();  // Obtém o ano (ex: 2023)
const mes = dataAtual.getMonth() + 1; // Obtém o mês (0 a 11, portanto, adicione 1 para obter o mês atual)
const dia = dataAtual.getDate();       // Obtém o dia do mês
const dataAluguel = (dia+"/"+mes+"/"+ano);



async function emprestimo(alugar){
    const cliente = await clienteService.buscarPorId(alugar.cli_id);
    const livro = await livrosService.buscarPorId(alugar.livro_id);
    const status = await emprestimoRepository.buscarstatus(alugar.livro_id);
    console.log(cliente);
    console.log(livro);
    console.log(status);
    alugar.status = true ;
    alugar.dataAluguel = dataAluguel;
    if (cliente) {
        if (livro) {
            check = verificarStatus(status)
            console.log(check)
            if (check == false) {
               return await emprestimoRepository.alugar(alugar);
            } else {
                throw {id:400, message:"livro ja alugado"}
            }
        } else {
            throw  {id:401 , message:"livro nao encontrado"}
        }
    } else {
        throw {id:401 , message:"cliente nao encontrado"}
    }    
}

function verificarStatus(listastatus){
    let tamanho = listastatus.length;
    console.log(tamanho);
    if (tamanho <= 0) {
        return false 
    } else {
       return true  
    }
}


async function listar(){
    return await emprestimoRepository.listar();
}

async function buscarPorId(id) {
    const emprestimo = await emprestimoRepository.buscarPorId(id);
    if(emprestimo) {
        return emprestimo;
    }
    else {
        throw {id:404, message:"emprestimo nao encontrado"};
    }
}

async function deletar(id) {
    const emprestimoDeletado = await emprestimoRepository.deletar(id);
    if(emprestimoDeletado){
        return emprestimoDeletado;
    }
    else {
        throw {id: 404, message: "empresimo nao encontrado"};
    }
}


async function devolucao(devol){
    const cliente = await clienteService.buscarPorId(devol.cli_id);
    const livro = await livrosService.buscarPorId(devol.livro_id);
    let status = await emprestimoRepository.buscarEmprestimo(devol.livro_id);
    console.log(cliente);
    console.log(livro);
    console.log(status)
    if (cliente) {
        if (livro) {
            check = await verificarStatus(status)
            console.log(check)
            if (check == true) {
               return await emprestimoRepository.Devolucao(status);
            } else {
                throw {id:400, message:"livro ja devolvido"}
            }
        } else {
            throw  {id:401 , message:"livro nao encontrado"}
        }
    } else {
        throw {id:401 , message:"cliente nao encontrado"}
    }    
}

module.exports={
    emprestimo,
    listar,
    buscarPorId,
    deletar,
    devolucao
}




// [{},{},{}] retorno do banco

