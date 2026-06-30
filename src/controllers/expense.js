const { Expense } = require('../models');
const { Op } = require('sequelize');

class ExpenseController {

    listar = async (req, res) => {
        try {
            const { status, categoria, dataInicio, dataFim, valorMin, valorMax } = req.query;
            const whereClause = { usuarioId: req.userId };
            if (status) whereClause.status = status;
            if (categoria) whereClause.categoriaId = categoria;

            if (valorMin || valorMax) {
                whereClause.valor = {};
                if (valorMin) whereClause.valor[Op.gte] = valorMin;
                if (valorMax) whereClause.valor[Op.lte] = valorMax;
            }

            if (dataInicio || dataFim) {
                whereClause.data = {};
                if (dataInicio) whereClause.data[Op.gte] = dataInicio;
                if (dataFim) whereClause.data[Op.lte] = dataFim;
            }

            const despesas = await Expense.findAll({ where: whereClause });
            res.json(despesas);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar despesas" });
        }
    };

    buscarPorId = async (req, res) => {
        try {
            const despesa = await Expense.findByPk(req.params.id);
            if (!despesa) return res.status(404).json({ error: "Expense not found" });
            res.json(despesa);
        } catch (error) {
            res.status(500).json({ error: "Error to find expense" });
        }
    };

    criar = async (req, res) => {
        try {
            // Atribui o ID extraído do token JWT
            const nova = await Expense.create({ ...req.body, usuarioId: req.userId });
            res.status(201).json(nova);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar despesa" });
        }
    };

    atualizar = async (req, res) => {
        try {
            const atualizada = await Expense.update(req.body, { where: { id: req.params.id } });
            if (!atualizada[0]) return res.status(404).json({ error: "Expense not found" });
            res.json({ message: "Expense updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error to update expense" });
        }
    };

    remover = async (req, res) => {
        try {
            const deletada = await Expense.destroy({ where: { id: req.params.id } });
            if (!deletada) return res.status(404).json({ error: "Expense not found" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error to delete expense" });
        }
    };


}


module.exports = new ExpenseController();
