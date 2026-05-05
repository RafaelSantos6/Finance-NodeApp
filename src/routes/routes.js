const express = require ('express');
const router = express.Router();
const expenseController = require('../controllers/expense.js');


router.get("api/", expenseController.listar);
router.get("api/:id", expenseController.buscarPorId);
router.post("api/", expenseController.criar);
router.put("api/:id", expenseController.atualizar);
router.delete("api/:id", expenseController.remover);

module.exports = router;

