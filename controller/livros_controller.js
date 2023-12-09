const livrosService = require('../service/livros_service')


async function listar(req, res) {
    const listaProdutos = await livrosService.listar();
    res.json(listaProdutos);
}

async function inserir(req, res) {
    let livro = req.body;
    try {
        await livrosService.inserir(livro);
      res.status(201).json({msg:'Inserido com sucesso!'})
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const livro = await livrosService.buscarPorId(id);
      res.json(livro);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }
}
async function atualizar(req, res) {
    const id = +req.params.id;
    let livro = req.body;
    try {
        await livrosService.atualizar(id,livro);
        res.json({msg:"livro atualizado com sucesso"});
    } catch (error) {
      res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const livroDeletado = await livrosService.deletar(id);
      res.json(livroDeletado);
    }
    catch(err) {
      res.status(err.id).json({msg: err.message});
    }   
}
async function BuscarLikeName(res, res){
    const livro = req.body;
    const livroNome = livro.nome;
    try {
        livro = await livrosService.BuscarLikeName(livroNome);
        res.json(livro);
    } catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}
module.exports={
    listar,
    inserir,
    buscarPorId,
    deletar,
    BuscarLikeName,
    atualizar
}