const livrosRepository = require('../repository/livros_repository')

async function listar() {
    return await livrosRepository.listar();
}

async function inserir(livro) {
    if (livro) {
        if (livro.nome) {
            if (livro.autor) {
                if (livro.editora) {
                    if (livro.isbn) {
                        await livrosRepository.inserir(livro);
                        throw {id:200, message:"livro inserido"}
                    } else {
                        throw { id: 400, message: "livro sem isbn" };
                    }
                } else {
                    throw { id: 400, message: "livro sem editora" };
                }
            } else {
                throw { id: 400, message: "livro sem autor" };
            }
        } else {
            throw { id: 400, message: "livro sem nome" };
        }
    } else {
        throw { id: 400, message: "erro livro" };
    }
}

async function atualizar(id, livro) {
    const objLivro = await livrosRepository.buscarPorId(id);
    if(!objLivro) {
        throw {id: 404, message: "livro nao encontrado"};
    }
    if(livro && livro.nome && livro.autor && livro.editora && livro.isbn) {
        await livrosRepository.atualizar(id,livro);
    }else{
        throw { id:404, message: "Dados do livro incompletos" };
    }
}
async function buscarPorId(id) {
    const livro = await livrosRepository.buscarPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"livro nao encontrado"};
    }
}
async function deletar(id) {
    const livroDeletado = await livrosRepository.deletar(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else {
        throw {did: 404, message: "livro nao encontrado"};
    }
}
async function BuscarLikeName(nome){
    const livro = await livrosRepository.BuscarLikeName(nome);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"livro nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    deletar,
    atualizar,
    BuscarLikeName
}