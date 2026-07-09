const { describe, test, expect, afterAll, beforeAll } = require('@jest/globals');
const AuthController = require('../../src/controllers/auth');
const CategoryController = require('../../src/controllers/category');
const sequelize = require('./../../src/data/database');
const { json } = require('sequelize');


let transaction;

    beforeAll(async () => {
        transaction = await sequelize.transaction()
    })

    afterAll(async () => {
        transaction.rollback();
        await sequelize.close();
    });

describe('Teste de autenticação', () => {
    test("Criar usuário", async () => {
        const req = {
            body: { nome: "Rafael", email: "teste@example.com", senha: "123" }
        };
        const res = {
            status: () => res,
            json: (dados) => {
                expect(dados.email).toBe(req.body.email);
            }
        };
        await AuthController.registrar(req, res, transaction);
    });
});

describe('Teste das categorias', () => {
    test("Criar categoria", async () => {
        const req = {
            body: {nome: "Jogos", descricao: "Gastos com jogos de videogame"}
        };
        const res = {
            status: () => res,
            json: (dados) => {
                expect(dados.nome).toBe(req.body.nome);
            }
        };
        await CategoryController.criar(req, res, transaction)
    })
})