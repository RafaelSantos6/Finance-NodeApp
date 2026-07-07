const { describe, test, expect, afterAll } = require('@jest/globals');
const AuthController = require('../../src/controllers/auth');
const { sequelize } = require('../../src/models/index');

describe('Teste de integração', () => {
    afterAll(async () => {
        await sequelize.close();
    });
    test("Criar usuário", async () => {
        const req = {
            body: { nome: "Rafael", email: "teste_simples@example.com", senha: "123" }
        };
        const res = {
            status: () => res, //
            json: (dados) => {
                expect(dados.email).toBe(req.body.email);
            }
        };
        await AuthController.registrar(req, res);
    });
});