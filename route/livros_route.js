const express = require('express')
const router = express.Router()

const livroController = require('../controller/livros_controller')




router.post('/', livroController.inserir);

router.get('/', livroController.listar);
router.get('/:id', livroController.buscarPorId);
router.get('/buscaNome', livroController.buscarNomelivro);

router.put('/:id',livroController.atualizar);

router.delete('/:id', livroController.deletar);


module.exports = router;