const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.js');

router.get('/total-expenses', dashboardController.totalGastos);
router.get('/expenses-count', dashboardController.quantidade);
router.get('/expenses-by-category', dashboardController.gastosPorCategoria);

module.exports = router;