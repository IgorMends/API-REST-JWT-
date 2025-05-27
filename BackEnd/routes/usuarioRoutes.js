const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.get('/', controller.listar);       // GET /produtos
router.post('/', controller.criar);       // POST /produtos
router.put('/:id', controller.atualizar); // PUT /produtos/:id
router.delete('/:id', controller.deletar);// DELETE /produtos/:id

module.exports = router;