const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

/**
 * @swagger
 * /users:
 * post:
 * summary: Cadastra un nuevo usuario
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - nome
 * - email
 * - senha
 * properties:
 * nome:
 * type: string
 * email:
 * type: string
 * senha:
 * type: string
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 500:
 * description: Erro no servidor
 */
router.post('/users', authController.registrar);

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Realiza o login do usuário e retorna um token JWT
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - senha
 * properties:
 * email:
 * type: string
 * senha:
 * type: string
 * responses:
 * 200:
 * description: Login efetuado com sucesso e token gerado
 * 401:
 * description: Credenciais inválidas
 */
router.post('/auth/login', authController.login);

module.exports = router;