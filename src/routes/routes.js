const express = require ('express');
const router = express.Router();
const expenseController = require('../controllers/expense.js');


router.get("/", expenseController.listar);
router.get("/:id", expenseController.buscarPorId);
router.post("/", expenseController.criar);
router.put("/:id", expenseController.atualizar);
router.delete("/:id", expenseController.remover);

module.exports = router;

