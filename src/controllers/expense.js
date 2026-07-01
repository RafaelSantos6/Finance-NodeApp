const { Expense, Category } = require('../models');
const { Op } = require('sequelize');

class ExpenseController {

    listar = async (req, res) => {
        try {
            const { status, categoria, dataInicio, dataFim, custoMin, custoMax } = req.query;
            const whereClause = { usuarioId: req.userId };
            res.json(despesas);
            if (status) whereClause.status = status;
            if (categoria) whereClause.categoriaId = categoria;

            if (custoMin || custoMax) {
                whereClause.custo = {};
                if (custoMin) whereClause.custo[Op.gte] = custoMin;
                if (custoMax) whereClause.custo[Op.lte] = custoMax;
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
            const despesa = await Expense.findOne({
                where: {
                    id: req.params.id,
                    usuarioId: req.userId
                }
            });

            if (!despesa) {
                return res.status(404).json({ error: "Despesa não encontrada" });
            }
            res.json(despesa);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar despesa" });
        }
    };
    criar = async (req, res) => {
        try {
            const {
                descricao,
                custo,
                data,
                status,
                categoriaId
            } = req.body;

            const categoria = await Category.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({
                    error: "Categoria não encontrada"
                });
            }

            const despesa = await Expense.create({
                descricao,
                custo,
                data,
                status,
                categoriaId,
                usuarioId: req.userId
            });

            return res.status(201).json(despesa);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: error.message
            });
        }
    };

    atualizar = async (req, res) => {
        try {
            const [atualizado] = await Expense.update(req.body, {
                where: {
                    id: req.params.id,
                    usuarioId: req.userId
                }
            });

            if (atualizado === 0) {
                return res.status(404).json({ error: "Despesa não encontrada ou não pertence ao usuário" });
            }
            res.json({ message: "Despesa atualizada com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar despesa" });
        }
    };

    remover = async (req, res) => {
        try {
            const deletado = await Expense.destroy({
                where: {
                    id: req.params.id,
                    usuarioId: req.userId
                }
            });

            if (!deletado) {
                return res.status(404).json({ error: "Despesa não encontrada ou não pertence ao usuário" });
            }
            res.json({ message: "Despesa removida com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao remover despesa" });
        }
    };

}


module.exports = new ExpenseController();
