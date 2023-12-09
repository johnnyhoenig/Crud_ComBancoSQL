const clienteRepository = require('../repository/cliente_repository')

async function listar() {
    return await clienteRepository.listar();
}

async function inserir(cliente) {
    let user = await clienteRepository.BuscarLikeName(cliente.nome);
    if (user) {
        throw {id:400, message:"user ja existe"}
    };
    if(cliente) {// cliente != undefined
        if (cliente.nome) {
            if (cliente.email) {
                if (cliente.senha) {
                    return await clienteRepository.inserir(cliente);
                     
                } else {
                    throw {id:400, message:"cliente sem senha"};
                }
            } else {
                throw {id:400, message:"cliente sem email"};
            }
        } else {
            throw {id:400, message:"cliente sem nome"};
        }
    }
    else {
        throw {id:400, message:"erro cliente"};
    }
}
async function buscarPorId(id) {
    const cliente = await clienteRepository.buscarPorId(id);
    if(cliente) {
        return cliente;
    }
    else {
        throw {id:404, message:"cliente nao encontrado"};
    }
}

async function atualizar(id,cliente) {
    let user = await clienteRepository.BuscarLikeName(cliente.nome);
    if (!user) {
        throw {id:400, message:"cliente nao encontrado"}
    };
    if(user && user.nome && user.email && user.senha) {
        return await clienteRepository.atualizar(id,user);
    }
}
async function deletar(id) {
    const clienteDeletado = await clienteRepository.deletar(id);
    if(clienteDeletado){
        return clienteDeletado;
    }
    else {
        throw {id: 404, message: "cliente nao encontrado"};
    }
}
async function BuscarLikeName(nome) {
    const cliente = await clienteRepository.BuscarLikeName(nome);
    if(cliente) {
        return cliente;
    }
    else {
        throw {id:404, message:"cliente nao encontrado"};
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    BuscarLikeName
}