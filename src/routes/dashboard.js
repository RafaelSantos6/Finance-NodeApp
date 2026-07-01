const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.js');

/**
 * @swagger
 * /dashboard/total-expenses:
 *   get:
 *     summary: Retorna o total de gastos do usuário logado
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Valor total retornado com sucesso
 */
router.get('/total-expenses', dashboardController.totalGastos);

/**
 * @swagger
 * /dashboard/expenses-count:
 *   get:
 *     summary: Retorna a quantidade de despesas cadastradas
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade retornada com sucesso
 */
router.get('/expenses-count', dashboardController.quantidade);

/**
 * @swagger
 * /dashboard/expenses-by-category:
 *   get:
 *     summary: Retorna os gastos consolidados por categoria
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas geradas com sucesso
 */
router.get('/expenses-by-category', dashboardController.gastosPorCategoria);

module.exports = router;