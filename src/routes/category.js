const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.js');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias cadastradas
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *
 *   post:
 *     summary: Cria uma nova categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */
router.get('/', categoryController.listar);
router.post('/', categoryController.criar);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da categoria retornados
 *       404:
 *         description: Categoria não encontrada
 *
 *   put:
 *     summary: Atualiza os dados de uma categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *
 *   delete:
 *     summary: Remove uma categoria por ID
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/:id', categoryController.buscarPorId);
router.put('/:id', categoryController.atualizar);
router.delete('/:id', categoryController.remover);

module.exports = router;