const emprestimoservice = require('../service/emprestimo_service')


async function listar(req, res) {
    const listaemprestimo = await emprestimoservice.listar();
    res.json(listaemprestimo);
}

async function emprestimo(req, res) {
    let alugar = req.body;
    try {
      await emprestimoservice.emprestimo(alugar);
      res.status(201).json({msg:'alugado'})
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
      const emprest = await emprestimoservice.buscarPorId(id);
      res.json(emprest);
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try{ 
      const emprestimoDeletado = await emprestimoservice.deletar(id);
      res.json(emprestimoDeletado);
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }   
}

async function devolucao(req, res) {
    let devolver = req.body;
    try {
      await emprestimoservice.devolucao(devolver);
      res.status(201).json({msg:'devolvido'})
    }
    catch(err) {
      res.status(err.id|| 500).json({msg: err.message});
    }
}


module.exports={
    emprestimo,
    listar,
    buscarPorId,
    deletar,
    devolucao
}
