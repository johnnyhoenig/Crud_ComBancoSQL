const clienteService = require('../service/cliente_service')


async function listar(req, res) {
    const listaClientes = await clienteService.listar();
    res.json(listaClientes);
}

async function inserir(req, res) {
    let cliente = req.body;
    try {
      await clienteService.inserir(cliente);
      res.status(201).json({msg:'Inserido com sucesso!'})
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const cli = await clienteService.buscarPorId(id);
      res.json(cli);
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const clienteDeletado= await clienteService.deletar(id);
      res.json(clienteDeletado);
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }   
}

async function atualizar (req, res) {
    const id = +req.params.id;
    let usuario = req.body;
  
    try{ 
      await clienteService.atualizar(id, usuario);
      res.json({msg:'usuario atualizado com sucesso'});
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }
}
async function BuscarLikeName(req, res){
  const nome = req.body;
  try {
      cli = await clienteService.BuscarLikeName(nome);
      res.json(cli);
  } catch (err) {
      res.status(err.id|| 500).json({msg: err.message});
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
  BuscarLikeName,
}