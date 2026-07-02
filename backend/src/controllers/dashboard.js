const { Expense, Category, sequelize } = require('../models');

class DashboardController {
    totalGastos = async (req, res) => {
        try {
            // CORRIGIDO DE 'custo' PARA 'valor'
            const total = await Expense.sum('valor', { where: { usuarioId: req.userId } });
            res.json({ total: total || 0 });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao calcular total' });
        }
    };

    quantidade = async (req, res) => {
        try {
            const quantidade = await Expense.count({ where: { usuarioId: req.userId } });
            res.json({ quantidade });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao contar despesas' });
        }
    };

    gastosPorCategoria = async (req, res) => {
        try {
            const estatisticas = await Expense.findAll({
                where: { usuarioId: req.userId },
                attributes: [
                    [sequelize.col('categoria.nome'), 'categoria'],
                    // CORRIGIDO DE 'custo' PARA 'valor'
                    [sequelize.fn('SUM', sequelize.col('valor')), 'total']
                ],
                include: [{
                    model: Category,
                    as: 'categoria',
                    attributes: []
                }],
                // Ajustado o Group para evitar erro de SQL strict mode ao usar o Include (Join)
                group: ['Expense.categoriaId', 'categoria.id'],
                raw: true // Adicionado para facilitar a leitura dos dados no Front-end
            });
            res.json(estatisticas);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao gerar estatísticas por categoria' });
        }
    };
}

module.exports = new DashboardController();