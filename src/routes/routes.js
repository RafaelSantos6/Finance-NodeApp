const express = require ('express');
const router = express.Router();
const expenseController = require('../controllers/expense.js');

/**
 * @swagger
 * /expenses:
 * get:
 * summary: Retorna a lista de despesas do usuário logado
 * tags: [Despesas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: query
 * name: status
 * schema:
 * type: string
 * description: Filtra por status (PENDENTE ou PAGA)
 * - in: query
 * name: categoria
 * schema:
 * type: integer
 * description: ID da categoria para filtro
 * responses:
 * 200:
 * description: Lista de despesas retornada com sucesso
 * 401:
 * description: Token não fornecido ou inválido
 */
router.get("/", expenseController.listar);

/**
 * @swagger
 * /expenses:
 * post:
 * summary: Cria uma nova despesa para o usuário logado
 * tags: [Despesas]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - descricao
 * - valor
 * - data
 * - categoriaId
 * properties:
 * descricao:
 * type: string
 * valor:
 * type: number
 * data:
 * type: string
 * format: date
 * categoriaId:
 * type: integer
 * responses:
 * 201:
 * description: Despesa criada com sucesso
 */
router.post("/", expenseController.criar);

/**
 * @swagger
 * /expenses/{id}:
 * get:
 * summary: Busca uma despesa específica por ID
 * tags: [Despesas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Dados da despesa
 * 404:
 * description: Despesa não encontrada
 */
router.get("/:id", expenseController.buscarPorId);
router.put("/:id", expenseController.atualizar);
router.delete("/:id", expenseController.remover);

module.exports = router;