const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.js');

router.get('/', categoryController.listar);
router.get('/:id', categoryController.buscarPorId);
router.post('/', categoryController.criar);
router.put('/:id', categoryController.atualizar);
router.delete('/:id', categoryController.remover);

module.exports = router;