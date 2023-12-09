const express = require('express')
const router = express.Router()

const clienteController = require('../controller/cliente_controller')


router.post('/', clienteController.inserir);

router.get('/', clienteController.listar);
router.get('/:id', clienteController.buscarPorId);
router.get('/buscaNome', clienteController.pesquisarPorLikeNome);

router.put('/:id',clienteController.atualizar);

router.delete('/:id', clienteController.deletar);

module.exports = router;
