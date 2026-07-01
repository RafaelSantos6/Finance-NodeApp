const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.js');

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Retorna a lista de despesas do usuário logado
 *     tags:
 *       - Despesas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de despesas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *
 *   post:
 *     summary: Cria uma nova despesa
 *     tags:
 *       - Despesas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Mercado
 *               valor:
 *                 type: number
 *                 example: 150.50
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-30"
 *               categoriaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.get("/", expenseController.listar);
router.post("/", expenseController.criar);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Busca uma despesa específica por ID
 *     tags:
 *       - Despesas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da despesa retornados
 *       404:
 *         description: Despesa não encontrada
 *
 *   put:
 *     summary: Atualiza uma despesa existente
 *     tags:
 *       - Despesas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               valor:
 *                 type: number
 *               data:
 *                 type: string
 *                 format: date
 *               categoriaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso
 *       404:
 *         description: Despesa não encontrada
 *
 *   delete:
 *     summary: Remove uma despesa por ID
 *     tags:
 *       - Despesas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da despesa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Despesa removida com sucesso
 *       404:
 *         description: Despesa não encontrada
 */
router.get("/:id", expenseController.buscarPorId);
router.put("/:id", expenseController.atualizar);
router.delete("/:id", expenseController.remover);

module.exports = router;