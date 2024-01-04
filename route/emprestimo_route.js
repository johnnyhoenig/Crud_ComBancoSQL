const express = require('express')
const router = express.Router()

const emprestimoController = require('../controller/empretimo_controller')




router.post('/emprestimo', emprestimoController.emprestimo);

router.put('/devolucao', emprestimoController.devolucao);

router.get('/', emprestimoController.listar);
router.get('/:id',emprestimoController.buscarPorId);

router.delete('/:id', emprestimoController.deletar);

module.exports = router;